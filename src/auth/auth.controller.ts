import {
  HttpCode,
  HttpStatus,
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from '@/user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy'
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@ApiBearerAuth('Bearer')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard(LocalStrategy.key))
  @Post('/login')
  async login(@Req() req: any) {
    const { user } = req;
    if (!user) {
      throw new UnauthorizedException();
    }
    const data = await this.authService.generateAccessToken(user);
    return data;
  }

  @Post('/sign-up')
  async signUpUser(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.registerUser(registerUserDto);
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard(JwtStrategy.key))
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
