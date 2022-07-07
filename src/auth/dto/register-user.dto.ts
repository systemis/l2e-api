import {
  IsString,
  IsEnum,
  ArrayUnique,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { PasswordCredential } from './password-credetial.dto';
import { UserRole, WalletCredential } from '@/user/entities/user.entity';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsEnum(UserRole)
  @ArrayUnique()
  roles: string[];

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  displayName: string;

  @ValidateNested()
  credential: PasswordCredential;

  @ValidateNested()
  walletCredential: WalletCredential;

  @IsString()
  class: string;

  @IsNumber()
  gpa: number;

  @IsNumber()
  credit: number;
}
