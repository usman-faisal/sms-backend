import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { SalesmenRepository } from './repositories/salesmen.repository';
import { Types } from 'mongoose';

@Injectable()
export class SalesmenService {
  constructor(private readonly salesmenRepostiroy: SalesmenRepository) {}
  create(createSalesmanDto: CreateSalesmanDto) {
    return 'This action adds a new salesman';
  }

  findAll() {
    return this.salesmenRepostiroy.find({}, [
      { path: 'user', select: 'username' },
      { path: 'areas' },
    ]);
  }

  findOne(id: number) {
    return this.salesmenRepostiroy.findOne({ _id: id });
  }

  async update(id: string, updateSalesmanDto: UpdateSalesmanDto) {
    try {
      const objectId = new Types.ObjectId(id);
      const salesman = await this.salesmenRepostiroy.findOne(
        { _id: objectId },
        {},
        [{ path: 'user' }],
      );
      if (!salesman) {
        throw new NotFoundException('Salesman not found');
      }

      return this.salesmenRepostiroy.findOneAndUpdate(
        { _id: objectId },
        {
          areas: updateSalesmanDto.areas,
          // 'user.username': updateSalesmanDto.username,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException('Error while updating salesman');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} salesman`;
  }
}
