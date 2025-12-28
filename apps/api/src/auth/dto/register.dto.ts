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