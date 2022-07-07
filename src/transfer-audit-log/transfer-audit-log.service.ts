import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import {
  TransferAuditLogDocument,
  TransferAuditLogModel,
} from './entities/transfer-audit-log.entity';
import { CreateTransferAuditLogDto } from './dto/create-transfer-audit-log.dto';

@Injectable()
export class TransferAuditLogService {
  constructor(
    @InjectModel(TransferAuditLogModel.name)
    private TransferAuditLogDocument: Model<TransferAuditLogDocument>,

    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  async createTransferAuditLog(
    createTransferAuditLogDto: CreateTransferAuditLogDto,
  ) {
    let transferAuditLog;
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const newTransferAuditLog = new this.TransferAuditLogDocument(
        createTransferAuditLogDto,
      );
      transferAuditLog = await newTransferAuditLog.save();
    });

    await session.endSession();
    return transferAuditLog;
  }
}
