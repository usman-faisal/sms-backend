import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto.request';
import { UsersRepository } from './users.repository';
import { SalesmenRepository } from 'src/salesmen/repositories/salesmen.repository';
import { Salesman } from 'src/salesmen/schemas/salesman.schema';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly salesmenRepository: SalesmenRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Salesman> {
    //  this.usersRepository.create(createUserDto);
    try {
      const user = await this.usersRepository.create(createUserDto);
      const salesman = await this.salesmenRepository.create({
        user: user._id,
        areas: [],
      });
      return salesman;
    } catch (error) {
      console.log(error, 'a');
      if (error.code === 11000) {
        throw new BadRequestException('Username already exists');
      }
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const id = new Types.ObjectId(userId);
      await this.salesmenRepository.deleteOne({
        user: id,
      });
      await this.usersRepository.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
}
