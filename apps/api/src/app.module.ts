import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { SherpaModule } from './sherpa/sherpa.module';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [DiscordModule, BookingModule, SherpaModule],
})
export class AppModule {}


