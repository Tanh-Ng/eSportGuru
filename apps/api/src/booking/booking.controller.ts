import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.bookingService.confirm(id);
  }

  @Post(':id/reject')
  reject(@Param('id') id: string) {
    return this.bookingService.cancel(id);
  }

  @Get(':id/invite')
  invite(@Param('id') id: string) {
    const booking = this.bookingService.findById(id);
    return { inviteLink: booking.discordInviteLink, discordChannelId: booking.discordChannelId };
  }

  @Get('sherpa/:sherpaId')
  listForSherpa(@Param('sherpaId') sherpaId: string) {
    return this.bookingService.listForSherpa(sherpaId);
  }

  @Get('learner/:learnerId')
  listForLearner(@Param('learnerId') learnerId: string) {
    return this.bookingService.listForLearner(learnerId);
  }
}


