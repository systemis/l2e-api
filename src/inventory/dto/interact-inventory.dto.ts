import { IsString } from 'class-validator';

export class InteractInventoryDto {
  @IsString()
  inventoryId: string;
}
