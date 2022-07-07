import { AuthJwt } from '../entities/jwt.entity';

export class JwtAuthDto implements AuthJwt {
  id: string;
  username: string;
  email: string;
}
