import {
  IsString, 
  IsNotEmpty,
} from 'class-validator';

export class CreateTodoDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    desc: string;

    @IsString()
    userId: string;

    @IsString()
    status: boolean;
}