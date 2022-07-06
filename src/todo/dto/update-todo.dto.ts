import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { TodoStatus } from '../entities/todo.entity';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  status: TodoStatus;
}
