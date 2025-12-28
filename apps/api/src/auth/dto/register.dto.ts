export class RegisterDto {
  email: string;
  password: string;
  displayName?: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class SherpaRegisterDto extends RegisterDto {
  bio: string;
  hourlyRate: number; // Lưu ý: Schema dùng Int cho cents [cite: 4]
  gameId: string; // Phải là ObjectId hợp lệ từ MongoDB [cite: 3]
}