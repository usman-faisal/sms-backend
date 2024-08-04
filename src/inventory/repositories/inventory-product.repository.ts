
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

import { InventoryProduct, InventoryDocument } from '../schemas/inventory-product.schema';

@Injectable()
export class InventoryProductRepository extends EntityRepository<InventoryDocument> {
  constructor(@InjectModel(InventoryProduct.name) inventoryModel: Model<InventoryDocument>) {
    super(inventoryModel);
  }
}
