import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, SherpaAvailability } from '@prisma/client';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SherpaService {
  constructor(private prisma: PrismaService) { }
  // ===== TRẠNG THÁI (STATUS) =====
  // Thay vì dùng mảng statuses[] tạm thời, ta lưu trực tiếp vào SherpaProfile trong DB
  async upsertStatus(userId: string, availability: SherpaAvailability, isAcceptingBooking: boolean) {
    return await this.prisma.sherpaProfile.update({
      where: { userId },
      data: {
        availability,
        isAcceptingBooking
      },
    });
  }

  async findStatus(userId: string) {
    const status = await this.prisma.sherpaProfile.findUnique({
      where: { userId },
      select: {
        userId: true,
        availability: true,
        isAcceptingBooking: true,
      },
    });

    if (!status) {
      throw new NotFoundException('Sherpa status not found');
    }
    return status;
  }

  // ===== HỒ SƠ (PROFILE) =====
  async getProfile(userId: string) {
    // Đã có relation trong schema.prisma nên không cần 'as any' 
    const profile = await this.prisma.sherpaProfile.findUnique({
      where: { userId },
      include: {
        game: true
      },
    });

    if (!profile) {
      throw new NotFoundException('Sherpa profile not found');
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    data: {
      bio?: string;
      hourlyRate?: number;
      gameId?: string;
      availability?: SherpaAvailability;
    },
  ) {
    return await this.prisma.sherpaProfile.update({
      where: { userId },
      data: {
        bio: data.bio,
        hourlyRate: data.hourlyRate,
        gameId: data.gameId,
        availability: data.availability,
      },
      include: {
        game: true
      },
    });
  }

  // ===== QUẢN LÝ LỊCH DẠY (SLOTS) =====
  async createSlots(sherpaId: string, slots: { startTime: Date; endTime: Date }[]) {
    const data = slots.map(slot => ({
      sherpaId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: false,
    }));

    // Lưu ý: MongoDB không hỗ trợ skipDuplicates: true trong createMany
    const result = await this.prisma.sherpaAvailabilitySlot.createMany({
      data,
    });

    return { count: result.count };
  }

  async getAvailableSlots(sherpaId: string, from?: Date, to?: Date) {
    const where: any = {
      sherpaId,
      isBooked: false,
    };

    if (from || to) {
      where.startTime = {};
      if (from) where.startTime.gte = from;
      if (to) where.startTime.lte = to;
    }

    return await this.prisma.sherpaAvailabilitySlot.findMany({
      where,
      orderBy: { startTime: 'asc' },
    });
  }

  async deleteSlot(slotId: string, sherpaId: string) {
    const slot = await this.prisma.sherpaAvailabilitySlot.findUnique({
      where: { id: slotId },
    });

    if (!slot || slot.sherpaId !== sherpaId) {
      throw new NotFoundException('Slot not found or not owned by sherpa');
    }

    if (slot.isBooked) {
      throw new BadRequestException('Cannot delete a slot that has already been booked');
    }

    await this.prisma.sherpaAvailabilitySlot.delete({
      where: { id: slotId },
    });

    return { success: true };
  }

  async getAllSherpasWithGame() {
    return await this.prisma.sherpaProfile.findMany({
      where: {
        isAcceptingBooking: true, // optional
        availability: 'AVAILABLE', // optional
      },
      include: {
        game: true, // JOIN Game theo gameId
      },
    });
  }
}