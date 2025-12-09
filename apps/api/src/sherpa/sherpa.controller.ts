import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SherpaService } from './sherpa.service';

class UpdateAvailabilityDto {
  userId: string;
  availability: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  isAcceptingBooking: boolean;
}

@Controller('sherpa')
export class SherpaController {
  constructor(private readonly sherpaService: SherpaService) {}

  @Post('availability')
  updateAvailability(@Body() dto: UpdateAvailabilityDto) {
    return this.sherpaService.upsertStatus(dto.userId, dto.availability, dto.isAcceptingBooking);
  }

  @Get(':userId/status')
  getStatus(@Param('userId') userId: string) {
    return this.sherpaService.findStatus(userId);
  }
}

