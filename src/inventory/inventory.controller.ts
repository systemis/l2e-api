import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { RoleGaurd } from '@/auth/roles-guard.guard';
import { UserRole } from '@/user/entities/user.entity';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InteractInventoryDto } from './dto/interact-inventory.dto';
import { BuyInventoryDto } from './dto/buy-inventory.dto';

@ApiBearerAuth('Bearer')
@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  // @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  // @SetMetadata('roles', [UserRole.admin])
  @Get('/')
  async getActivities() {
    return await this.inventoryService.findInventories();
  }

  // @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  // @SetMetadata('roles', [UserRole.admin])
  @Post('/')
  async createActivity(@Body() createInventoryDto: CreateInventoryDto) {
    return await this.inventoryService.createInventory(createInventoryDto);
  }

  @Get('/detail/:id')
  async getActivityById(@Param('id') inventoryId: string) {
    const activity = await this.inventoryService.findInventoryById(inventoryId);
    return activity;
  }
  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @Post('/interact')
  async interact(
    @Req() req: any,
    @Body() interactInventoryDto: InteractInventoryDto,
  ) {
    const { user } = req?.user;
    return await this.inventoryService.interactWithInventory(
      user._id,
      interactInventoryDto.inventoryId,
    );
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @Post('/buy-inventory')
  async buyInteract(@Req() req: any, @Body() buyInventoryDto: BuyInventoryDto) {
    const { user } = req?.user;
    return await this.inventoryService.buyInventory({
      userId: user?._id,
      inventoryId: buyInventoryDto.inventoryId,
    });
  }

  @UseGuards(AuthGuard(JwtStrategy.key), RoleGaurd)
  @Get('/user-inventories')
  async getUserInventories(@Req() req: any) {
    const { user } = req?.user;
    return await this.inventoryService.findInventoryOwn(user?._id);
  }
}
