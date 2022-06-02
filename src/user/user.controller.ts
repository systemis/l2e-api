import {
  Patch,
  Controller,
  Get,
  Body,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiBearerAuth('Bearer')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Patch('')
  async updateProfile(@Body() createUserDto: CreateUserDto) {
    await this.userService.validate(
      createUserDto.username,
      createUserDto.email
    );
  }
}
