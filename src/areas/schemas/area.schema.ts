import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Shop } from '../../shops/schemas/shop.schema';
import { Salesman } from 'src/salesmen/schemas/salesman.schema';

export type AreaDocument = Area & Document;

@Schema()
export class Area {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: Shop.name })
  shops: Shop[];
}

export const AreaSchema = SchemaFactory.createForClass(Area);
