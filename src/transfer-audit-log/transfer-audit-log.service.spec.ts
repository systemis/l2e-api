import { Test, TestingModule } from '@nestjs/testing';
import { TransferAuditLogService } from './transfer-audit-log.service';

describe('TransferAuditLogService', () => {
  let service: TransferAuditLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferAuditLogService],
    }).compile();

    service = module.get<TransferAuditLogService>(TransferAuditLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
