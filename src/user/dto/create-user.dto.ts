import { UserRole, WalletCredential } from '@/user/entities/user.entity';
import {
  ArrayUnique,
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  avatar: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  displayName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsEnum(UserRole, { each: true })
  @ArrayUnique()
  roles: string[];

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(32)
  username: string;

  @IsString()
  class: string;

  @IsNumber()
  gpa: number;

  @IsNumber()
  credit: number;

  @ValidateNested()
  walletCredential: WalletCredential;
}
