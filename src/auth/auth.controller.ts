import { 
  HttpCode, 
  HttpStatus, 
  Request, 
  Body, 
  Controller, 
  Post, 
  UseGuards,
  NotFoundException, 
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LoginAuthDto } from './dto/login.auth.dto';
import { UserService } from '@/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService, 
  ) {}

  @UseGuards(AuthGuard(LocalStrategy.key))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Request() req, @Body() loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByUsernameOrEmail(loginAuthDto.username);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.authService.generateAccessToken(user);
  }
}
