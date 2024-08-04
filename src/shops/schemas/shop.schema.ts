import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({type: [Types.ObjectId], ref: Order.name})
  orders: Order[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
