import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { RoleGaurd } from '@/auth/roles-guard.guard';
import { UserRole, UserDocument } from '@/user/entities/user.entity';
import { ActivityService } from './activity.service';
import { CreateActivityDTO } from './dto/create-activity.dto';

@ApiBearerAuth('Bearer')
@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(
    private activityService: ActivityService
  ) { }


  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @Get('/')
  async getActivities() {
    return await this.activityService.findActivities();
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @SetMetadata('roles', [UserRole.admin])
  @Post('/')
  async createActivity(@Body() createActivityDTO: CreateActivityDTO) {
    return await this.activityService.createActivity(createActivityDTO);
  }

  @Get('/details/:id')
  async getActivityById(@Param('id') activityId: string) {
    const activity = await this.activityService.findActivityById(activityId);
    return activity;
  }
}
