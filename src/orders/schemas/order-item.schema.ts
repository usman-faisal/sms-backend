import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InventoryProduct } from 'src/inventory/schemas/inventory-product.schema';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
    @Prop({type: Types.ObjectId, ref: InventoryProduct.name})
    product: InventoryProduct;
    
    @Prop()
    quantity: number;
    
    @Prop()
    price: number;
}

export const  OrderItemSchema= SchemaFactory.createForClass(OrderItem);
