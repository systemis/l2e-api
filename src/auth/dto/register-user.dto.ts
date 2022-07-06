import {
  IsString,
  IsEnum,
  ArrayUnique,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { PasswordCredential } from './password-credetial.dto';
import { UserRole } from '@/user/entities/user.entity';

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
}
