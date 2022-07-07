import { IsString } from 'class-validator';

export class CreateActivityAuditLogDto {
  @IsString()
  activityId: string;

  @IsString()
  userId: string;
}
