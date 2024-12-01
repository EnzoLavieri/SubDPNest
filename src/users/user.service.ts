import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepo.findOneBy({ _id: new ObjectId(id) });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepo.findOneBy({ username });
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    await this.usersRepo.update({ _id: new ObjectId(id) }, user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepo.delete({ _id: new ObjectId(id) });
  }
}
