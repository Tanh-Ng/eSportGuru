import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Import thêm dòng này

@Module({
  imports: [PrismaModule], // Thêm PrismaModule vào mảng imports
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}