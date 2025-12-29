import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { SherpaService } from './sherpa.service';
// 1. Sửa lại đường dẫn import và thêm JwtAuthGuard
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';



// Khuyến khích: Nên di chuyển DTO này ra file riêng trong thư mục dto
class UpdateAvailabilityDto {
  availability: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  isAcceptingBooking: boolean;
}

@Controller('sherpa')
// 2. Phải có JwtAuthGuard trước RolesGuard để xác thực token
@UseGuards(JwtAuthGuard, RolesGuard)
export class SherpaController {
  constructor(private readonly sherpaService: SherpaService) { }

  @Post('availability')
  @Roles(Role.SHERPA)
  updateAvailability(@Req() req: any, @Body() dto: UpdateAvailabilityDto) {
    // 3. Lấy userId từ payload mà JwtStrategy đã validate (payload.sub gán vào userId)
    const userId = req.user.userId;

    // Gọi service để cập nhật trạng thái trong MongoDB [cite: 3]
    return this.sherpaService.upsertStatus(
      userId,
      dto.availability,
      dto.isAcceptingBooking
    );
  }

  @Get(':userId/status')
  // Cho phép cả Sherpa và Learner xem trạng thái online/offline [cite: 1]
  @Roles(Role.SHERPA, Role.LEARNER)
  getStatus(@Param('userId') userId: string) {
    return this.sherpaService.findStatus(userId);
  }

  @Get('public')
  @Public()
  getAllSherpasPublic() {
    return this.sherpaService.getAllSherpasWithGame();
  }
}