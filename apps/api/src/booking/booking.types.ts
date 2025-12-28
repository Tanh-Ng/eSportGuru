export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Booking {
  id: string;
  learnerId: string;
  sherpaId: string;
  status: BookingStatus;
  startTime: Date;
  endTime?: Date;
  discordChannelId?: string;
  discordInviteLink?: string;
  notes?: string;
}


