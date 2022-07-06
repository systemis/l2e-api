import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TransferType } from '../entities/transfer-audit-log.entity';

export class CreateTransferAuditLogDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  @IsEnum(TransferType)
  type: string;

  @IsNumber()
  amount: number;
}
