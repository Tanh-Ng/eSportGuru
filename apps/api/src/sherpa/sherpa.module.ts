import { Module } from '@nestjs/common';
import { SherpaService } from './sherpa.service';
import { SherpaController } from './sherpa.controller';

@Module({
  controllers: [SherpaController],
  providers: [SherpaService],
})
export class SherpaModule {}


