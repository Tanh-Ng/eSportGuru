import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DiscordService } from '../discord/discord.service';
import { Booking, BookingStatus } from './booking.types';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];

  constructor(private readonly discordService: DiscordService) {}

  create(data: CreateBookingDto): Booking {
    const booking: Booking = {
      id: randomUUID(),
      learnerId: data.learnerId,
      sherpaId: data.sherpaId,
      status: BookingStatus.PENDING,
      startTime: new Date(data.startTime),
      notes: data.notes,
    };

    this.bookings.push(booking);
    return booking;
  }

  findById(id: string): Booking {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }
    return booking;
  }

  async confirm(id: string): Promise<Booking> {
    const booking = this.findById(id);
    booking.status = BookingStatus.CONFIRMED;

    const room = await this.discordService.createPrivateRoom(id);
    booking.discordChannelId = room.discordChannelId;
    booking.discordInviteLink = room.inviteLink;

    return booking;
  }

  cancel(id: string): Booking {
    const booking = this.findById(id);
    booking.status = BookingStatus.CANCELLED;
    return booking;
  }

  listForSherpa(sherpaId: string): Booking[] {
    return this.bookings.filter((b) => b.sherpaId === sherpaId);
  }

  listForLearner(learnerId: string): Booking[] {
    return this.bookings.filter((b) => b.learnerId === learnerId);
  }
}


