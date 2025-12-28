import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    learnerId: string;

    @IsString()
    sherpaId: string;

    @IsDateString()
    startTime: string;

    @IsOptional()
    @IsString()
    notes?: string;
}


