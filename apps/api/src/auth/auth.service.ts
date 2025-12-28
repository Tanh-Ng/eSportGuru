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
        displayName: user.displayName
      }
    };
  }


  // auth/auth.service.ts
  async registerSherpa(data: SherpaRegisterDto) {
    const { email, password, displayName, bio, hourlyRate, gameId } = data;

    // Kiểm tra email tồn tại
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(password, 10);

    // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu
    return await this.prisma.$transaction(async (tx) => {
      // 1. Tạo User với Role là SHERPA
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          displayName,
          roles: ['SHERPA'], // Gán quyền SHERPA ngay từ đầu [cite: 1]
        },
      });

      // 2. Tạo SherpaProfile liên kết với User vừa tạo 
      const profile = await tx.sherpaProfile.create({
        data: {
          userId: user.id,
          bio,
          hourlyRate,
          gameId,
          isAcceptingBooking: true, // Mặc định chấp nhận lịch 
          availability: 'AVAILABLE', // Mặc định trạng thái sẵn sàng 
        },
      });

      return { userId: user.id, profileId: profile.id };
    });
  }
}