import { Injectable, BadGatewayException, InternalServerErrorException, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';

interface CreateRoomPayload {
  bookingId: string;
  channelName?: string;
}

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private readonly botBaseUrl = process.env.BOT_BASE_URL;
  private readonly guildId = process.env.DISCORD_GUILD_ID ?? '@me';

  constructor(private readonly prisma: PrismaService) {}

  /**
   * @desc    Yêu cầu Bot tạo phòng voice cho buổi học
   * @access  Internal (Gọi từ BookingService)
   */
  async createPrivateRoom(payload: CreateRoomPayload) {
    if (!this.botBaseUrl) {
      this.logger.warn('BOT_BASE_URL chưa được cấu hình, sử dụng Mock mode');
      return this.generateMockRoom(payload.bookingId);
    }

    try {
      const res = await fetch(`${this.botBaseUrl}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: payload.bookingId,
          channelName: payload.channelName,
        }),
      });

      if (!res.ok) {
        throw new BadGatewayException(`Bot service trả về lỗi: ${res.status}`);
      }

      const data = (await res.json()) as { discordChannelId: string };
      
      // Tạo link mời dựa trên Guild ID và Channel ID nhận được
      const inviteLink = `https://discord.com/channels/${this.guildId}/${data.discordChannelId}`;

      return {
        discordChannelId: data.discordChannelId,
        inviteLink,
      };
    } catch (error) {
      this.logger.error(`Lỗi khi tạo phòng Discord cho booking ${payload.bookingId}:`, error);
      throw new InternalServerErrorException('Không thể kết nối với Bot Discord');
    }
  }

  /**
   * @desc    Kết thúc session, xóa phòng và lưu nhật ký (SessionLog)
   * @access  Internal
   */
  async endSession(bookingId: string) {
    if (!this.botBaseUrl) {
      return { bookingId, totalSeconds: 0, discordChannelId: `mock-${bookingId}` };
    }

    try {
      const res = await fetch(`${this.botBaseUrl}/sessions/${bookingId}/end`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new BadGatewayException(`Lỗi khi kết thúc buổi học từ Bot: ${res.status}`);
      }

      const result = (await res.json()) as { 
        bookingId: string; 
        totalSeconds: number; 
        discordChannelId: string 
      };

      // TỰ ĐỘNG LƯU NHẬT KÝ: Khi kết thúc, ghi ngay vào bảng SessionLog
      await this.prisma.sessionLog.create({
        data: {
          bookingId: result.bookingId,
          durationSeconds: result.totalSeconds, // Thời gian thực tế lấy từ bot
          botNotes: `Session kết thúc tự động tại channel ${result.discordChannelId}`,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(`Lỗi khi kết thúc session ${bookingId}:`, error);
      throw new InternalServerErrorException('Lỗi hệ thống khi đóng phòng học');
    }
  }

  /**
   * Mock dữ liệu khi chưa có bot thật để không gián đoạn việc phát triển
   */
  private generateMockRoom(bookingId: string) {
    const discordChannelId = `mock-room-${bookingId.slice(0, 5)}`;
    const inviteLink = `https://discord.gg/${randomUUID().slice(0, 8)}`;

    return {
      discordChannelId,
      inviteLink,
    };
  }
}