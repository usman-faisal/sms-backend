import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Salesman, SalesmanDocument } from '../schemas/salesman.schema';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class SalesmenRepository extends EntityRepository<SalesmanDocument> {
  constructor(
    @InjectModel(Salesman.name) salesmanModel: Model<SalesmanDocument>,
  ) {
    super(salesmanModel);
  }
}
