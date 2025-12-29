import express from 'express';
import { Client, ChannelType } from 'discord.js';
import { sessionStore } from './sessionStore';
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

  // Create session & room
  // Chỉ cần bookingId, tạo phòng công khai (mọi người trong server có thể vào)
  app.post('/sessions', async (req, res) => {
    try {
      const { bookingId, channelName, learnerUserId, learnerDiscordId, sherpaUserId, sherpaDiscordId } = req.body;
      if (!bookingId) {
        return res.status(400).json({ error: 'bookingId is required' });
      }

      // If a session already exists for this booking, return existing channel/invite instead of creating new ones
      const existing = sessionStore.getSession(bookingId);
      if (existing) {
        try {
          const guild = await client.guilds.fetch(existing.guildId);
          const ch = await guild.channels.fetch(existing.channelId as any).catch(() => null) as any;
          const invite = ch ? await (ch as any).createInvite({ maxAge: 0, unique: true }).catch(() => null) : null;
          console.log('[bot] Session already exists, returning existing channel for', bookingId);
          return res.json({ bookingId, channelId: existing.channelId, invite: invite ? invite.url : null });
        } catch (err) {
          console.warn('[bot] Error returning existing session invite', err);
          return res.status(500).json({ error: 'failed_to_return_existing_session' });
        }
      }

      const guild = await client.guilds.fetch(GUILD_ID);
      const category = await getOrCreateCategory(guild);

      // Tạo một phòng voice duy nhất cho cả Sherpa và Learner
      const baseName = channelName || `session-${bookingId.slice(0, 8)}`;
      const sessionChannel = await guild.channels.create({
        name: baseName,
        type: ChannelType.GuildVoice,
        parent: category.id,
      });

      // Thiết lập permission: ẩn với @everyone, mở cho learner + sherpa nếu có
      try {
        const everyoneRole = guild.roles.everyone;
        await (sessionChannel as any).permissionOverwrites.edit(everyoneRole.id, { ViewChannel: false, Connect: false });
      } catch (_) { }

      if (learnerDiscordId) {
        try { await (sessionChannel as any).permissionOverwrites.edit(learnerDiscordId, { ViewChannel: true, Connect: true }); } catch (_) { }
      }
      if (sherpaDiscordId) {
        try { await (sessionChannel as any).permissionOverwrites.edit(sherpaDiscordId, { ViewChannel: true, Connect: true }); } catch (_) { }
      }

      // Tạo invite (vô thời hạn)
      const invite = await (sessionChannel as any).createInvite({ maxAge: 0, unique: true }).catch(() => null);

      sessionStore.createSession({
        bookingId,
        channelId: sessionChannel.id,
        guildId: guild.id,
      });

      // Log session details to bot terminal for visibility
      console.log('[bot] Session created:', {
        bookingId,
        learnerUserId: learnerUserId ?? null,
        learnerDiscordId: learnerDiscordId ?? null,
        sherpaUserId: sherpaUserId ?? null,
        sherpaDiscordId: sherpaDiscordId ?? null,
        invite: invite ? invite.url : null,
        channelId: sessionChannel.id,
      });

      return res.json({
        bookingId,
        channelId: sessionChannel.id,
        invite: invite ? invite.url : null,
        channelName: baseName,
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
      const ch = await guild.channels.fetch(session.channelId as any).catch(() => null) as any;
      if (ch && ch.deletable) await ch.delete('Session ended');

      return res.json({
        bookingId,
        channelId: session.channelId,
        totalSeconds: session.totalSeconds,
      });
    } catch (e: any) {
      console.error('[bot] error ending session', e);
      return res.status(500).json({ error: 'failed_to_end_session', detail: e?.message });
    }
  });

  // Start session: try to move users if they're in voice, otherwise return invites for both channels
  app.post('/sessions/:bookingId/start', async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { learnerDiscordId, sherpaDiscordId } = req.body;

      const session = sessionStore.getSession(bookingId);
      if (!session) return res.status(404).json({ error: 'session_not_found' });

      const guild = await client.guilds.fetch(session.guildId);

      const ch = await guild.channels.fetch(session.channelId as any).catch(() => null) as any;

      // Always create fresh invite
      const invite = ch ? await (ch as any).createInvite({ maxAge: 0, unique: true }).catch(() => null) : null;

      const moved = { learner: false, sherpa: false };

      // Try to move both members into the same channel
      if (learnerDiscordId) {
        const member = await guild.members.fetch(learnerDiscordId).catch(() => null);
        if (member && member.voice && member.voice.channelId) {
          try { await member.voice.setChannel(ch.id); moved.learner = true; } catch (_) { }
        }
      }
      if (sherpaDiscordId) {
        const member = await guild.members.fetch(sherpaDiscordId).catch(() => null);
        if (member && member.voice && member.voice.channelId) {
          try { await member.voice.setChannel(ch.id); moved.sherpa = true; } catch (_) { }
        }
      }

      return res.json({
        bookingId,
        moved,
        channelId: session.channelId,
        invite: invite ? invite.url : null,
      });
    } catch (e: any) {
      console.error('[bot] error starting session', e);
      return res.status(500).json({ error: 'failed_to_start_session', detail: e?.message });
    }
  });

  return app;
}


