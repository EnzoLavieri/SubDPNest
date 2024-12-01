import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUser: User) {
    return this.usersService.create(createUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<User | { message: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return { message: 'Usuário não encontrado' };
    }
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: Partial<User>) {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
