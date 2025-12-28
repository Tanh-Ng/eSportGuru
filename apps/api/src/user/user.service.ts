// user.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Lấy thông tin cá nhân và số dư hiện tại
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        balance: true, // Xem số dư 
        roles: true,
        discordId: true,
      },
    });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');
    return user;
  }

  // Nạp tiền vào tài khoản
  async topUp(userId: string, amount: number) {
    if (amount <= 0) throw new BadRequestException('Số tiền nạp phải lớn hơn 0');
    
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: { increment: amount }, // Tăng số dư 
      },
    });
  }

  // Khấu trừ tiền khi đặt vé (được gọi từ BookingService hoặc Controller)
  async deductBalance(userId: string, amount: number) {
    const user = await this.getMe(userId);
    if (user.balance < amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện thanh toán');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    });
  }
}