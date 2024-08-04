import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ShopsRepository } from './repositories/shops.repository';
import { CreateShopDto } from './dto/create-shop.request.dto';
import { AreasRepository } from 'src/areas/repositories/areas.repository';
import { UsersRepository } from 'src/users/users.repository';
import { SalesmenRepository } from 'src/salesmen/repositories/salesmen.repository';
import { SalesmenService } from 'src/salesmen/salesmen.service';

@Injectable()
export class ShopsService {
  constructor(
    private readonly shopsRepository: ShopsRepository,
    private readonly areasRepository: AreasRepository,
    private readonly salesmenRepository: SalesmenRepository,
    private readonly salesmenService: SalesmenService
  ) {

  }



  async deleteShop(userId: Types.ObjectId, areaId: string, shopId: string) {
    try {
      await this.salesmenService.doesAreaBelongToSalesman(userId, areaId);
      const area = await this.areasRepository.findOne({ _id: areaId });
      if (!area) {
        throw new NotFoundException();
      }
      const shop = await this.shopsRepository.findOne({ _id: shopId });
      if (!shop) {
        throw new NotFoundException();
      }
      area.shops = area.shops.filter((s) => s.toString() !== shopId);
      await area.save();
    } catch (e) {
      console.log(e);
    }
  }

  async updateShop(
    userId: Types.ObjectId,
    areaId: string,
    shopId: string,
    updateShopDto: CreateShopDto,
  ) {
    try {
      await this.salesmenService.doesAreaBelongToSalesman(userId, areaId);
      const area = await this.areasRepository.findOne({ _id: areaId });
      if (!area) {
        throw new NotFoundException();
      }
      const shop = await this.shopsRepository.findOne({ _id: shopId });
      if (!shop) {
        throw new NotFoundException();
      }
      await this.shopsRepository.findOneAndUpdate(
        { _id: shopId },
        updateShopDto,
      );
    } catch (e) {
      console.log(e);
    }
  }

  async getShopsByArea(userId: Types.ObjectId, areaId: string) {
    try {
      await this.salesmenService.doesAreaBelongToSalesman(userId, areaId);
      const area = await this.areasRepository.findOne({ _id: areaId });
      if (!area) {
        throw new NotFoundException();
      }
      return area.shops;
    } catch (e) {
      console.log(e);
    }
  }
  async createShop(
    createShopDto: CreateShopDto,
    userId: Types.ObjectId,
    areaId: string,
  ) {
    try {
      await this.salesmenService.doesAreaBelongToSalesman(userId, areaId);
      const area = await this.areasRepository.findOne({ _id: areaId });
      if (!area) {
        throw new NotFoundException();
      }
      const newShop = await this.shopsRepository.create(createShopDto);
      area.shops.push(newShop);
      await area.save();
    } catch (e) {
      console.log(e);
    }
  }
}
