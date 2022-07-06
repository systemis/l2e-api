import { IsString } from 'class-validator';

export class BuyInventoryDto {
  @IsString()
  inventoryId: string;

  @IsString()
  userId: string;
}
