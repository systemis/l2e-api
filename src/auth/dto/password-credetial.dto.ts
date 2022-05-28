import { IsString } from 'class-validator';

export class PasswordCredential {
  @IsString()
  password: string;
}