import { IsString, MinLength } from 'class-validator';

export class PasswordCredential {
  @IsString()
  @MinLength(6)
  password: string;
}
