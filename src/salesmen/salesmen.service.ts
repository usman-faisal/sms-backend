import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { SalesmenRepository } from './repositories/salesmen.repository';
import { Types } from 'mongoose';

@Injectable()
export class SalesmenService {
  constructor(private readonly salesmenRepository: SalesmenRepository) {}
  create(createSalesmanDto: CreateSalesmanDto) {
    return 'This action adds a new salesman';
  }

  async doesAreaBelongToSalesman(userId: Types.ObjectId, areaId: string) {
    const salesman = await this.salesmenRepository.findOne({ user: userId });
    if (!salesman.areas.includes(areaId as unknown as Types.ObjectId)) {
      throw new BadRequestException()
    }
    return true;
  }
  findAll() {
    return this.salesmenRepository.find({}, [
      { path: 'user', select: 'username' },
      { path: 'areas' },
    ]);
  }

  findOne(id: number) {
    return this.salesmenRepository.findOne({ _id: id });
  }

  async update(id: string, updateSalesmanDto: UpdateSalesmanDto) {
    try {
      const objectId = new Types.ObjectId(id);
      const salesman = await this.salesmenRepository.findOne(
        { _id: objectId },
        {},
        [{ path: 'user' }],
      );
      if (!salesman) {
        throw new NotFoundException('Salesman not found');
      }

      return this.salesmenRepository.findOneAndUpdate(
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
