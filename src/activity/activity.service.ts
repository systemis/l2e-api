import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateActivityDTO } from './dto/create-activity.dto';
import { CreateActivityAuditLogDto } from './dto/create-activity-audit-log.dto';
import { ActivityModel, ActivityDocument } from './entities/activity.entity';
import { ActivityAuditLogModel, ActivityAuditLogDocument } from './entities/activity-audit-log.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(ActivityModel.name)
    private ActivityDocument: Model<ActivityDocument>,

    @InjectModel(ActivityAuditLogModel.name)
    private ActivityAuditLogDocument: Model<ActivityAuditLogDocument>
  ) { }

  async createActivity(createActivityDTO: CreateActivityDTO) {
    const activity = new this.ActivityDocument(createActivityDTO);
    const newActivity = await activity.save();
    return newActivity;
  }

  async createActivityAuditLog(createActivityAuditLogDto: CreateActivityAuditLogDto) {
    const activityAuditLog = new this.ActivityAuditLogDocument(createActivityAuditLogDto);
    const newActivityAuditLog = await activityAuditLog.save();
    return newActivityAuditLog;
  }

  async findActivities() {
    return this.ActivityDocument.find({ sort: 'createdAt' });
  }

  async findActivityById(activityId: string) {
    return this.ActivityDocument.findById(activityId);
  }

  async findAuditLogByActivityId(activityId: string) {
    return this.ActivityAuditLogDocument.findOne({
      activityId
    })
  }

  async findAuditLogsByActivityId(activityId: string) {
    return this.ActivityAuditLogDocument.find({
      activityId
    })
  }

  async findAuditLogByUserId(userId: string) {
    return this.ActivityAuditLogDocument.findOne({
      userId
    })
  }

  async findAuditLogsByUserId(userId: string) {
    return this.ActivityAuditLogDocument.find({
      userId
    })
  }
}
