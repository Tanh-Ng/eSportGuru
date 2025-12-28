import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Hàm này xử lý khi Token không hợp lệ hoặc không có Token
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Bạn cần đăng nhập để thực hiện hành động này');
    }
    return user;
  }
}