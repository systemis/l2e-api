import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '@/constants/jwt';
import { UserService } from '@/user/user.service';
import { JwtAuthDto } from './dto/jwt-auth.dto';

const JwtKey = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtKey) {
  static key = JwtKey;

  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validateWithJwtCredential(jwtPayload: JwtAuthDto) {
    const user = await this.userService.findById(jwtPayload.id);
    if (!user) throw new UnauthorizedException();

    return { user };
  }

  async validate(payload: JwtAuthDto) {
    const data = await this.validateWithJwtCredential(payload);
    return data;
  }
}
