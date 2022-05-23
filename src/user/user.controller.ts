import { 
  Controller, 
  Get, 
  Request,
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {} 

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Get('/Profile') 
  async getProfile(@Request() req) {
    return req.user;
  }
}
