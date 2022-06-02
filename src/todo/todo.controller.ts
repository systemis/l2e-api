import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { GetTodosByTitleDto } from './dto/get-todos-by-title.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { JwtStrategy } from '@/auth/jwt.strategy';

@ApiBearerAuth('Bearer')
@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService
  ) { }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Post()
  async createTodo(@Request() req, @Body() createTodoDTO: CreateTodoDTO) {
    createTodoDTO.userId = req.user.id;
    return await this.todoService.createTodo(createTodoDTO);
  }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Get()
  async getTodos(@Request() req) {
    const todos = await this.todoService.findTodosByUserId(req.user.id);
    return todos;
  }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Get('/title/:title')
  async getTodosByTitle(
    @Request() req,
    @Body() getTodosByTitleDto: GetTodosByTitleDto
  ) {
    const todos = await this.todoService.findTodosByTitle(req.user.id, getTodosByTitleDto.title);
    return todos;
  }

  @UseGuards(AuthGuard(JwtStrategy.key))
  @Patch(':todoId')
  async updateTodo(
    @Request() req,
    @Param('todoId') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    const updatedResut = await this.todoService.updateTodo(req.user.id, todoId, updateTodoDto);
    return updatedResut;
  }
}
