import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

import { OrderItem, OrderItemDocument } from '../schemas/order-item.schema';

@Injectable()
export class OrderItemsRepository extends EntityRepository<OrderItemDocument> {
  constructor(@InjectModel(OrderItem.name) userModel: Model<OrderItemDocument>) {
    super(userModel);
  }
}
