// user.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard) // Chỉ người dùng đã đăng nhập mới xem được thông tin mình
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // API xem thông tin cá nhân & số dư
  @Get('me')
  async getMe(@Req() req) {
    return await this.usersService.getMe(req.user.userId);
  }

  // API nạp tiền (Ví dụ: sau khi thanh toán qua cổng thanh toán xong)
  @Post('top-up')
  async topUp(@Req() req, @Body('amount') amount: number) {
    return await this.usersService.topUp(req.user.userId, amount);
  }
}