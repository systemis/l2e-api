import {
  IsString,
  ValidateNested, 
} from 'class-validator';

import { PasswordCredential } from '../entities/auth.entity';

export class CreateAuthDto {
  @IsString()
  userId: string; 

  @ValidateNested()
  credential: PasswordCredential;
}