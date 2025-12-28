// auth/dto/sherpa-register.dto.ts
import { RegisterDto } from '../../auth/dto/register.dto';

export class SherpaRegisterDto extends RegisterDto {
  bio: string;
  hourlyRate: number; // Lưu ý: Schema của bạn lưu Int (cents) 
  gameId: string;     // ID của game mà Sherpa này hỗ trợ 
}