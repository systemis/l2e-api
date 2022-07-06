import { UserRole } from '@/user/entities/user.entity';
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
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  avatar?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  displayName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(UserRole, { each: true })
  @ArrayUnique()
  roles?: string[];

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(32)
  username?: string;

  @IsOptional()
  @IsNumber()
  balance?: number;
}
