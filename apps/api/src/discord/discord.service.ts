import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class DiscordService {
  /**
   * Simulate Discord private room creation for a booking.
   * Returns deterministic-friendly ids so frontend can deep link immediately.
   */
  async createPrivateRoom(bookingId: string) {
    const discordChannelId = `room-${bookingId}`;
    const inviteLink = `https://discord.gg/${randomUUID().slice(0, 8)}`;

    return {
      discordChannelId,
      inviteLink,
    };
  }
}

