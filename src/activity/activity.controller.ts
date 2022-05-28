import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDTO } from './dto/create-activity.dto';

@ApiBearerAuth('Bearer')
@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(
    private activityService: ActivityService
  ) {}

  @Post('/')
  async createActivity(@Body() createActivityDTO: CreateActivityDTO) {
      return await this.activityService.createActivity(createActivityDTO);
  }

  @Get('/')
  async getActivities() {
    const result = await this.activityService.findActivities();
    return result;
  }

  @Get('/details/:id')
  async getActivityById(@Param('id') activityId: string) {
    const activity = await this.activityService.findActivityById(activityId);
    return activity;
  }
}
