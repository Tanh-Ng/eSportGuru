import { Module } from '@nestjs/common';
import { SherpaService } from './sherpa.service';
import { SherpaController } from './sherpa.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SherpaController],
  providers: [SherpaService],
  exports: [SherpaService],
})
export class SherpaModule {}