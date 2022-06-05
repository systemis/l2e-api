import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { UserDocument } from '@/user/entities/user.entity';

@Injectable()
export class RoleGaurd implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const session = request as {
      user: UserDocument,
    };

    return (
      roles.filter((role) => session.user.roles.indexOf(role)).length > 0
    );
  }
}