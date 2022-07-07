import { IsString, IsAlphanumeric, IsNumber, IsEnum } from 'class-validator';
import { InventoryType } from '../entities/inventory.entity';

export class CreateInventoryDto {
  @IsAlphanumeric()
  title: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsEnum(InventoryType)
  type: InventoryType;

  @IsNumber()
  amount: number;
}
