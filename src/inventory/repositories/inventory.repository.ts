
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

import { Inventory, InventoryDocument } from '../schemas/inventory.schema';

@Injectable()
export class InventoryRepository extends EntityRepository<InventoryDocument> {
  constructor(@InjectModel(Inventory.name) inventoryModel: Model<InventoryDocument>) {
    super(inventoryModel);
  }
}
