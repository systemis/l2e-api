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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@/user/user.service';
import { UserDocument } from '@/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LoginAuthDto } from './dto/login.auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@ApiBearerAuth('Bearer')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService, 
  ) {}

  @UseGuards(AuthGuard(LocalStrategy.key))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByUsernameOrEmail(loginAuthDto.username);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.authService.generateAccessToken(user);
  }

  @Post('/sign-up')
  async signUpUser(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.registerUser(registerUserDto);
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/update-password') 
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    const session = req.user;

    const { user } = session as unknown as {
      user: UserDocument;
    };

    await this.authService.updatePassword(user._id, updatePasswordDto);
    return {
      msg: 'UPDATE::PASSWORD::SUCCESSFULLY', 
    };
  }
}
