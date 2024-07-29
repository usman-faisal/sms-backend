import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AreasRepository } from './repositories/areas.repository';
import { Types } from 'mongoose';
import { SalesmenService } from 'src/salesmen/salesmen.service';
import { SalesmenRepository } from 'src/salesmen/repositories/salesmen.repository';
import { CreateAreaDto } from './dto/create-area.request.dto';

@Injectable()
export class AreasService {
  constructor(
    private readonly areasRepository: AreasRepository,
    private readonly salesmenRepository: SalesmenRepository,
  ) {}
  async getAreas(userId: Types.ObjectId) {
    try {
      const salesman = await this.salesmenRepository.findOne(
        { user: userId },
        {},
        [{ path: 'areas' }],
      );
      if (!salesman) {
        const response = await this.salesmenRepository.create({ user: userId });
        return [];
      }
      return salesman.areas;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching areas');
    }
  }
  getAllAreas() {
    return this.areasRepository.find({});
  }
  addArea(createAreaDto: CreateAreaDto) {
    this.areasRepository.create(createAreaDto);
  }

  async getAvailableAreas(id: string) {
    try {
      const areas = await this.areasRepository.find({});
      const salesmen = await this.salesmenRepository.find(
        { _id: { $ne: id } },
        [{ path: 'areas' }],
      );

      const availableAreas = areas.filter((area) => {
        return !salesmen.some((salesman) => {
          return salesman.areas.some((salesmanArea) => {
            console.log(salesmanArea, 'a');
            return salesmanArea.equals(area._id as string);
          });
        });
      });
      return availableAreas;
    } catch (error) {
      console.log(error, 'a');
      throw new InternalServerErrorException(
        'Error while fetching available areas',
      );
    }
  }
}
