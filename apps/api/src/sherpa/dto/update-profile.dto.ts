import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateSherpaProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  hourlyRate?: number;

  @IsOptional()
  @IsString()
  gameId?: string;

  @IsOptional()
  @IsString()
  availability?: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
}