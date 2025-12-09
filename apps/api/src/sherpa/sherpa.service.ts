import { Injectable } from '@nestjs/common';

export type SherpaAvailability = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

type SherpaStatus = {
  userId: string;
  availability: SherpaAvailability;
  isAcceptingBooking: boolean;
};

@Injectable()
export class SherpaService {
  private statuses: SherpaStatus[] = [];

  upsertStatus(userId: string, availability: SherpaAvailability, isAcceptingBooking: boolean) {
    const existing = this.statuses.find((s) => s.userId === userId);
    if (existing) {
      existing.availability = availability;
      existing.isAcceptingBooking = isAcceptingBooking;
      return existing;
    }

    const status: SherpaStatus = { userId, availability, isAcceptingBooking };
    this.statuses.push(status);
    return status;
  }

  findStatus(userId: string) {
    return this.statuses.find((s) => s.userId === userId);
  }
}

