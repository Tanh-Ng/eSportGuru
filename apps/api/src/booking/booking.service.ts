import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DiscordService } from '../discord/discord.service';
import { PrismaService } from '../../prisma/prisma.service'; // Giả định bạn đã có PrismaService
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '@prisma/client'; // Sử dụng enum từ schema 

@Injectable()
export class BookingService {
  // Loại bỏ mảng private bookings = [] để dùng DB

  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  /**
   * THÊM (Create): Lưu record mới vào MongoDB.
   * Logic: Lấy giá hourlyRate hiện tại của Sherpa để chốt giá vào booking.
   */
  async create(data: CreateBookingDto) {
    const sherpaProfile = await this.prisma.sherpaProfile.findUnique({
      where: { userId: data.sherpaId }
    });

    if (!sherpaProfile) throw new NotFoundException('Không tìm thấy Sherpa');

    return await this.prisma.booking.create({
      data: {
        learnerId: data.learnerId,
        sherpaId: data.sherpaId,
        status: BookingStatus.PENDING, // Mặc định là PENDING 
        startTime: new Date(data.startTime),
        price: sherpaProfile.hourlyRate, // Chốt giá tại thời điểm đặt 
        notes: data.notes,
      },
    });
  }

  /**
   * TÌM KIẾM (Find): Tìm theo ID trong DB.
   */
  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) throw new NotFoundException(`Booking ${id} không tồn tại`);
    return booking;
  }

  /**
   * XÁC NHẬN (Confirm): Cập nhật trạng thái và tạo phòng Discord[cite: 1, 6].
   */
  async confirm(id: string) {
    const booking = await this.findById(id);

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Chỉ có thể xác nhận các yêu cầu đang PENDING');
    }

    const room = await this.discordService.createPrivateRoom({
      bookingId: booking.id,
    });

    return await this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CONFIRMED,
        discordChannelId: room.discordChannelId, // Lưu ID kênh [cite: 6]
        discordInviteLink: room.inviteLink,      // Lưu link mời [cite: 6]
      },
    });
  }

  /**
   * XÓA (Soft Delete): Không xóa cứng, chỉ chuyển sang CANCELLED.
   * Giúp giữ lại lịch sử để đối soát balance (số dư).
   */
  async cancel(id: string) {
    await this.findById(id);

    return await this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    });
  }

  /**
   * LIÊT KÊ: Truy vấn danh sách từ Database theo ID người dùng.
   */
  async listForSherpa(sherpaId: string) {
    return await this.prisma.booking.findMany({
      where: { sherpaId },
      orderBy: { startTime: 'desc' },
    });
  }

  async listForLearner(learnerId: string) {
    return await this.prisma.booking.findMany({
      where: { learnerId },
      orderBy: { startTime: 'desc' },
    });
  }
}