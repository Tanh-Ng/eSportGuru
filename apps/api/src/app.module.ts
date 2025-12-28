import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { SherpaModule } from './sherpa/sherpa.module';
import { DiscordModule } from './discord/discord.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DiscordModule, BookingModule, SherpaModule, AuthModule],
})
export class AppModule { }

