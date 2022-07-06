import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  userId: string;

  @IsString()
  status: boolean;
}
