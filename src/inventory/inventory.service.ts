import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { BuyInventoryDto } from './dto/buy-inventory.dto';
import { InventoryModel, InventoryDocument } from './entities/inventory.entity';
import {
  InventoryAuditLogModel,
  InventoryAuditDocument,
} from './entities/inventory-audit-log.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectConnection()
    private readonly connection: mongoose.Connection,

    @InjectModel(InventoryModel.name)
    private InventoryDocument: Model<InventoryDocument>,

    @InjectModel(InventoryAuditLogModel.name)
    private InventoryAuditLogDocument: Model<InventoryAuditDocument>,

    private userService: UserService,
  ) {}

  async createInventory(createInventoryDto: CreateInventoryDto) {
    const inventory = await this.findInventoryByTitle(createInventoryDto.title);
    if (inventory) {
      throw new BadRequestException('Duplicated inventory with name');
    }

    const activity = new this.InventoryDocument(createInventoryDto);
    const newActivity = await activity.save();
    return newActivity;
  }

  async buyInventory(buyInventoryDto: BuyInventoryDto) {
    console.log('buyInventoryDto', buyInventoryDto);
    const user = await this.userService.findById(buyInventoryDto.userId);
    if (!user) {
      throw new NotFoundException();
    }

    const inventory = await this.findInventoryById(buyInventoryDto.inventoryId);
    if (!inventory) {
      throw new NotFoundException();
    }

    if (user.balance < inventory.price) {
      throw new BadRequestException(
        'Balance is not enough to buy this inventory',
      );
    }

    if (inventory.amount < 1) {
      throw new BadRequestException(
        'Amount of this inventory is not enough to buy',
      );
    }

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const inventoryAuditLog = new this.InventoryAuditLogDocument({
        inventoryId: buyInventoryDto.inventoryId,
        userId: buyInventoryDto.userId,
      });

      await inventoryAuditLog.save();

      await this.InventoryDocument.updateOne(
        { id: buyInventoryDto.inventoryId },
        {
          $set: { amount: inventory.amount - 1 },
        },
      );

      await this.userService.updateProfile(buyInventoryDto.userId, {
        balance: user.balance - inventory.price,
      });
    });
    await session.endSession();
  }

  async findInventories() {
    return this.InventoryDocument.find({ sort: 'createdAt' });
  }

  async findInventoryById(inventoryId: string) {
    return this.InventoryDocument.findById(inventoryId);
  }

  async findInventoryByTitle(title: string) {
    return this.InventoryDocument.findOne({ title });
  }

  async interactWithInventory(userId: string, inventoryId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException();
    }

    const inventory = await this.findInventoryById(inventoryId);
    if (!inventory) {
      throw new NotFoundException();
    }

    const _userId = user._id.toString();

    const interactions = inventory.interactions;

    const index = interactions.findIndex((item) => {
      return item === _userId;
    });

    if (index >= 0) {
      interactions.splice(index, 1);
    } else {
      interactions.push(_userId);
    }

    await this.InventoryDocument.updateOne(
      { id: inventoryId },
      {
        $set: { ...inventory, interactions },
      },
    );

    return this.findInventoryById(inventoryId);
  }
}
