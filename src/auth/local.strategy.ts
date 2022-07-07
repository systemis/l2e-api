import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service';

const PasswordAuthStrategyKey = 'password-auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  PasswordAuthStrategyKey,
) {
  static key = PasswordAuthStrategyKey;

  constructor(
    private userService: UserService,

    private authService: AuthService,
  ) {
    super();
  }

  async validateUserByPassword(username: string, password: string) {
    const user = await this.userService.findByUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('USER::NOT::FOUND');
    }
    return await this.authService.verifyPassword(user.id, password);
  }

  async validate(username: string, password: string) {
    const { user } = await this.validateUserByPassword(username, password);
    return user;
  }
}
