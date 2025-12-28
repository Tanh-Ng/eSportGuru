import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator'; // Import từ file decorator của bạn

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra user và mảng roles từ schema User 
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    
    if (!hasRole) {
      throw new ForbiddenException('Bạn không có quyền thực hiện hành động này');
    }

    return true;
  }
}