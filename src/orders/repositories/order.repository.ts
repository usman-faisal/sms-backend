import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersRepository extends EntityRepository<OrderDocument> {
  constructor(@InjectModel(Order.name) userModel: Model<OrderDocument>) {
    super(userModel);
  }
}
