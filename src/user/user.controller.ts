import { 
  Controller, 
  Get, 
  Request,
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UserService } from './user.service';

@ApiBearerAuth('Bearer')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {} 

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Get('/profile') 
  async getProfile(@Request() req) {
    return req.user;
  }
}
