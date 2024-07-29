import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Area, AreaDocument } from '../schemas/area.schema';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class AreasRepository extends EntityRepository<AreaDocument> {
  constructor(@InjectModel(Area.name) areaModel: Model<AreaDocument>) {
    super(areaModel);
  }
}
