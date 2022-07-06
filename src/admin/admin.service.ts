import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(private userService: UserService) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.userService.validate(
      createUserDto.username,
      createUserDto.username,
    );

    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(userId, updateUserDto);
  }
}
