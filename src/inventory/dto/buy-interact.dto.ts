import { IsString } from 'class-validator';

export class BuyInteractDto {
  @IsString()
  inventoryId: string;
}
