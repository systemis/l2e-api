import {
  HttpCode,
  HttpStatus,
  Request,
  Param,
  Body,
  Controller,
  Post,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { RoleGaurd } from '@/auth/roles-guard.guard';
import { UserRole } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UpdatePasswordDto } from '@/user/dto/update-password';
import { AdminService } from './admin.service';

@ApiBearerAuth('Bearer')
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,

    private userService: UserService,

    private authService: AuthService,
  ) { }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.adminService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @Post('/update-user/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.adminService.updateUser(
      userId,
      updateUserDto
    );
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @HttpCode(HttpStatus.OK)
  @Post('/update-user')
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.adminService.updateUser(
      req.user.id,
      updateUserDto
    );
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @Post('/update-password')
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    const result = await this.authService.updatePassword(
      req.user.id,
      updatePasswordDto
    );

    return result;
  }
}
