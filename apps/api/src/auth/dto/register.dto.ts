// auth/dto/register.dto.ts
export class RegisterDto {
  email: string;
  password: string;
  displayName?: string;
}

// auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}

export class SherpaRegisterDto extends RegisterDto {
  // Các thông tin bổ sung cho hồ sơ Sherpa từ schema [cite: 3, 4]
  bio: string;
  hourlyRate: number; 
  gameId: string;
}