import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { DiscordService } from '../discord/discord.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { BookingStatus } from '@prisma/client'

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) { }

  // ================= CREATE =================
  async create(data: CreateBookingDto) {
    const sherpaProfile = await this.prisma.sherpaProfile.findUnique({
      where: { userId: data.sherpaId },
    })

    if (!sherpaProfile) {
      throw new NotFoundException('Không tìm thấy Sherpa')
    }

    return this.prisma.booking.create({
      data: {
        learnerId: data.learnerId,
        sherpaId: data.sherpaId,
        status: BookingStatus.PENDING,
        startTime: new Date(data.startTime),
        price: sherpaProfile.hourlyRate,
        notes: data.notes || "Welcome to my room",
      },
    })
  }

  // ================= FIND BY ID =================
  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      throw new NotFoundException(`Booking ${id} không tồn tại`)
    }

    return booking
  }

  // ================= CONFIRM =================
  async confirm(id: string) {
    const booking = await this.findById(id)

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Chỉ xác nhận booking PENDING')
    }

    // load learner/sherpa discord/user ids to forward to bot for logging/moving
    const bookingWithUsers = await this.prisma.booking.findUnique({
      where: { id: booking.id },
      include: {
        learner: { select: { id: true, discordId: true } },
        sherpa: { select: { id: true, discordId: true } },
      },
    });

    this.logger.log(`Requesting bot createPrivateRoom for booking ${booking.id}`);
    const room = await this.discordService.createPrivateRoom({
      bookingId: booking.id,
      learnerUserId: bookingWithUsers?.learner?.id,
      learnerDiscordId: bookingWithUsers?.learner?.discordId,
      sherpaUserId: bookingWithUsers?.sherpa?.id,
      sherpaDiscordId: bookingWithUsers?.sherpa?.discordId,
    })

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CONFIRMED,
        discordChannelId: room.discordChannelId,
        discordInviteLink: room.inviteLink,
      },
    })
  }

  // ================= CANCEL =================
  async cancel(id: string) {
    await this.findById(id)

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    })
  }

  // ================= START SESSION =================
  /**
   * Khi Sherpa bấm Start: gọi bot để start session và trả về invites/move info
   */
  async start(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        learner: { select: { discordId: true } },
        sherpa: { select: { discordId: true } },
      },
    })

    if (!booking) throw new NotFoundException('Booking không tồn tại');

    // Gọi bot để start session
    const result = await this.discordService.startSession(
      booking.id,
      booking.learner?.discordId as string | undefined,
      booking.sherpa?.discordId as string | undefined,
    );

    return result;
  }

  // ================= LIST FOR SHERPA =================
  /**
   * Trả về:
   * - tên người học (User.displayName)
   * - tên game (Game.name)
   */
  async listForSherpa(sherpaId: string) {
    return this.prisma.booking.findMany({
      where: { sherpaId },
      orderBy: { startTime: 'desc' },
      select: {
        id: true,
        status: true,
        startTime: true,
        endTime: true,
        price: true,
        notes: true,

        // ===== learner =====
        learnerId: true,
        learner: {
          select: {
            displayName: true,
          },
        },

      },
    })
  }

  // ================= LIST FOR LEARNER =================
  async listForLearner(learnerId: string) {
    return this.prisma.booking.findMany({
      where: { learnerId },
      orderBy: { startTime: 'desc' },
    })
  }
}
