import { IsString, IsAlphanumeric, IsNumberString } from 'class-validator';

export class CreateActivityDTO {
  @IsAlphanumeric()
  title: string;

  @IsString()
  desc: string;

  @IsNumberString()
  credit: number;
}
