import {
  IsString, 
  IsNotEmpty,
} from 'class-validator';

import { TodoStatus } from '../entities/todo.entity';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  userId: string;

  @IsString()
  status: TodoStatus;
}