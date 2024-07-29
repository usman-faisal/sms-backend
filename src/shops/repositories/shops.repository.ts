import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

import { Shop, ShopDocument } from '../schemas/shop.schema';

@Injectable()
export class ShopsRepository extends EntityRepository<ShopDocument> {
  constructor(@InjectModel(Shop.name) shopModel: Model<ShopDocument>) {
    super(shopModel);
  }
}
