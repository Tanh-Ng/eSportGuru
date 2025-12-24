import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

interface CreateRoomPayload {
  bookingId: string;
  channelName?: string;
}

@Injectable()
export class DiscordService {
  private botBaseUrl = process.env.BOT_BASE_URL;

  /**
   * Tạo room cho booking (chỉ cần bookingId).
   * Nếu cấu hình BOT_BASE_URL thì gọi bot service thật,
   * nếu không sẽ fallback sang mock local.
   */
  async createPrivateRoom(payload: CreateRoomPayload) {
    if (this.botBaseUrl) {
      const res = await fetch(`${this.botBaseUrl}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: payload.bookingId,
          channelName: payload.channelName,
        }),
      });
      if (!res.ok) {
        throw new Error(`Bot service error: ${res.status}`);
      }
      const data = (await res.json()) as { discordChannelId: string };
      const inviteLink = `https://discord.com/channels/${process.env.DISCORD_GUILD_ID ?? '@me'}/${data.discordChannelId}`;
      return {
        discordChannelId: data.discordChannelId,
        inviteLink,
      };
    }

    // Fallback mock nếu chưa có bot
    const discordChannelId = `room-${payload.bookingId}`;
    const inviteLink = `https://discord.gg/${randomUUID().slice(0, 8)}`;

    return {
      discordChannelId,
      inviteLink,
    };
  }

  /**
   * Gọi bot để kết thúc session và xoá room, đồng thời nhận lại totalSeconds.
   */
  async endSession(bookingId: string) {
    if (!this.botBaseUrl) {
      return { bookingId, totalSeconds: 0, discordChannelId: `room-${bookingId}` };
    }

    const res = await fetch(`${this.botBaseUrl}/sessions/${bookingId}/end`, {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error(`Bot service error on end: ${res.status}`);
    }
    return (await res.json()) as { bookingId: string; totalSeconds: number; discordChannelId: string };
  }
}

