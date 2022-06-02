import { 
  HttpCode, 
  HttpStatus, 
  Request, 
  Body, 
  Controller, 
  Post, 
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiBearerAuth('Bearer')
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,    
  ) {}
}
