import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Giả định bạn đã có PrismaService
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // Kiểm tra email tồn tại
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) throw new ConflictException('Email đã tồn tại');

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Tạo user mới [cite: 1, 2]
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        displayName: data.displayName,
        roles: ['LEARNER'], // Mặc định role từ schema 
      },
    });

    return { message: 'Đăng ký thành công', userId: user.id };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName
      }
    };
  }
}