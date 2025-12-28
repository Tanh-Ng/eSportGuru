import express from 'express';
import { Client, ChannelType } from 'discord.js';
import { sessionStore, SessionState } from './sessionStore';
import { GUILD_ID, CATEGORY_ID, CATEGORY_NAME } from './config';

export function createHttpServer(client: Client) {
  const app = express();
  app.use(express.json());

  // Health
  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Helper: Tìm hoặc tạo category
  async function getOrCreateCategory(guild: any) {
    if (CATEGORY_ID) {
      const category = await guild.channels.fetch(CATEGORY_ID).catch(() => null);
      if (category && category.type === ChannelType.GuildCategory) {
        return category;
      }
      console.warn(`[bot] Category ID ${CATEGORY_ID} not found or invalid, creating new category`);
    }

    // Tìm category theo tên
    const existingCategory = guild.channels.cache.find(
      (ch: any) => ch.type === ChannelType.GuildCategory && ch.name === CATEGORY_NAME,
    );
    if (existingCategory) {
      return existingCategory;
    }

    // Tạo category mới nếu chưa có
    const newCategory = await guild.channels.create({
      name: CATEGORY_NAME,
      type: ChannelType.GuildCategory,
    });
    console.log(`[bot] Created new category: ${CATEGORY_NAME} (${newCategory.id})`);
    return newCategory;
  }

  // Helper function để xóa phòng khi hết giờ
  async function expireSession(session: SessionState) {
    console.log(`[bot] Session ${session.bookingId} expired after ${session.elapsedSeconds}s (${session.durationMinutes} minutes)`);
    
    try {
      const guild = await client.guilds.fetch(session.guildId);
      const channel = await guild.channels.fetch(session.channelId);
      
      if (channel && channel.deletable) {
        await channel.delete(`Session expired after ${session.durationMinutes} minutes`);
        console.log(`[bot] Deleted channel ${session.channelId} for expired session ${session.bookingId}`);
      }

      // Xóa session khỏi store
      sessionStore.deleteSession(session.bookingId);
    } catch (e: any) {
      console.error(`[bot] Error expiring session ${session.bookingId}`, e);
    }
  }

  // Create session & room
  // Chỉ cần bookingId, tạo phòng công khai (mọi người trong server có thể vào)
  app.post('/sessions', async (req, res) => {
    try {
      const { bookingId, channelName, durationMinutes } = req.body;
      if (!bookingId) {
        return res.status(400).json({ error: 'bookingId is required' });
      }

      // durationMinutes mặc định 60 phút nếu không có
      const duration = durationMinutes || 60;

      const guild = await client.guilds.fetch(GUILD_ID);
      const category = await getOrCreateCategory(guild);

      // Tạo phòng công khai - mọi người trong server có thể vào
      const createdChannel = await guild.channels.create({
        name: channelName || `session-${bookingId.slice(0, 8)}`,
        type: ChannelType.GuildVoice,
        parent: category.id,
        // Không set permissionOverwrites = mọi người có thể vào
      });

      sessionStore.createSession({
        bookingId,
        channelId: createdChannel.id,
        guildId: guild.id,
        durationMinutes: duration,
      });

      return res.json({
        bookingId,
        discordChannelId: createdChannel.id,
        channelName: createdChannel.name,
        durationMinutes: duration,
      });
    } catch (e: any) {
      console.error('[bot] error creating session', e);
      return res.status(500).json({ error: 'failed_to_create_session', detail: e?.message });
    }
  });

  // End session & delete room
  app.post('/sessions/:bookingId/end', async (req, res) => {
    const { bookingId } = req.params;
    try {
      const session = sessionStore.deleteSession(bookingId);
      if (!session) {
        return res.status(404).json({ error: 'session_not_found' });
      }

      const guild = await client.guilds.fetch(session.guildId);
      const channel = await guild.channels.fetch(session.channelId);
      if (channel && channel.deletable) {
        await channel.delete('Session ended manually');
      }

      return res.json({
        bookingId,
        discordChannelId: session.channelId,
        totalSeconds: session.totalSeconds,
        elapsedSeconds: session.elapsedSeconds,
      });
    } catch (e: any) {
      console.error('[bot] error ending session', e);
      return res.status(500).json({ error: 'failed_to_end_session', detail: e?.message });
    }
  });

  // Export expireSession để dùng trong index.ts
  (app as any).expireSession = expireSession;

  return app;
}


