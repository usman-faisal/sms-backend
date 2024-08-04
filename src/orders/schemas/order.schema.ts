import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem } from './order-item.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({type: Types.ObjectId, ref: OrderItem.name})
    items: OrderItem[];

    @Prop({default: new Date()})
    date: Date;

    @Prop({default: false})
    approved: boolean
}

export const OrderSchema = SchemaFactory.createForClass(Order);
