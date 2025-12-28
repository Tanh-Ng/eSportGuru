import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Lấy token từ header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', 
    });
  }

  // Sau khi giải mã thành công, dữ liệu trong payload sẽ được truyền vào đây
  async validate(payload: any) {
    // Dữ liệu trả về ở đây chính là req.user trong Controller
    return { 
      userId: payload.sub, 
      email: payload.email, 
      roles: payload.roles // Mảng Role[] từ schema của bạn 
    };
  }
}