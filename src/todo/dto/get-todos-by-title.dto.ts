import {
  IsString, 
  IsNotEmpty,
} from 'class-validator';

export class  GetTodosByTitleDto {
  @IsString()  
  @IsNotEmpty()
  title: string; 
}