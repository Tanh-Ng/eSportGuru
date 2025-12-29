import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { DiscordService } from '../discord/discord.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { BookingStatus } from '@prisma/client'

@Injectable()
export class BookingService {
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

    const room = await this.discordService.createPrivateRoom({
      bookingId: booking.id,
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
