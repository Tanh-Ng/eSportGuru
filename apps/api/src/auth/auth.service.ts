import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto, SherpaRegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(data: RegisterDto) {
    console.log("REGISTER DTO:", data);

    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    console.log("USER EXISTS:", !!userExists);

    if (userExists) throw new ConflictException("Email đã tồn tại");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        displayName: data.displayName,
        roles: ['LEARNER'],
      },
    });

    console.log("USER CREATED:", user.id);
    return { message: "OK", userId: user.id };
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
        displayName: user.displayName,
        role: user.roles
      }
    };
  }


  // auth/auth.service.ts
  async registerSherpa(data: SherpaRegisterDto) {
    const { email, password, displayName, bio, hourlyRate, gameId } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.$transaction(async (tx) => {
      // 1. Tạo User
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          displayName,
          roles: ['SHERPA'],
        },
      });

      // 2. Tạo SherpaProfile - CẬP NHẬT ĐOẠN NÀY
      const profile = await tx.sherpaProfile.create({
        data: {
          userId: user.id,
          // Cung cấp các trường bắt buộc mà bạn mới thêm vào Schema
          name: displayName,          // Lấy luôn displayName của user làm name
          avatar: "",                 // Mặc định rỗng hoặc link anime mock
          experience: 0,              // Mới đăng ký nên để 0
          rating: 5.0,                // Mặc định 5 sao cho người mới

          bio,
          hourlyRate,
          isAcceptingBooking: true,
          availability: 'AVAILABLE',

          // Dùng connect để tránh lỗi "string is not assignable to never"
          game: gameId ? {
            connect: { id: gameId }
          } : undefined,
        },
      });

      return { userId: user.id, profileId: profile.id };
    });
  }
}