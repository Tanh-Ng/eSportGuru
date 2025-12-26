import { IsDateString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested } from 'class-validator';

class SlotDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class CreateSherpaSlotsDto {
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  @ArrayMinSize(1)
  slots: SlotDto[];
}