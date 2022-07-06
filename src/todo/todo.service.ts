import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoModel, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoModel.name)
    private todoDocument: Model<TodoDocument>,
  ) {}

  async createTodo(createTodoDTO: CreateTodoDTO) {
    const todo = new this.todoDocument(createTodoDTO);
    const newTodo = await todo.save();
    return newTodo;
  }

  async updateTodo(
    userId: string,
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.findTodoByIdAndUserId(todoId);

    console.log('todoId', todoId);

    console.log(todo);

    console.log('updateTodoDto', updateTodoDto);

    if (todo.userId !== userId) throw new ForbiddenException();

    if (!todo) throw new NotFoundException();

    const updatedPayload = {
      $set: updateTodoDto,
    };

    await this.todoDocument.updateOne({ _id: todoId }, updatedPayload);
    return this.findTodoByIdAndUserId(todoId);
  }

  async findTodosByTitle(userId: string, title: string) {
    return this.todoDocument.find(
      {
        userId,
        title,
      },
      {},
      { sort: 'createdAt' },
    );
  }

  async findTodoByIdAndUserId(todoId: string) {
    return this.todoDocument.findById(todoId);
  }

  async findTodosByUserId(userId: string) {
    return this.todoDocument.find(
      {
        userId,
      },
      {},
      {
        sort: 'createdAt',
      },
    );
  }

  async deleteTodoById(todoId: string) {
    return this.todoDocument.deleteOne({ _id: todoId });
  }
}
