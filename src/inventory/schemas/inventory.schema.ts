import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InventoryProduct, InventroyProductSchema } from './inventory-product.schema';

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
    @Prop({type: [Types.ObjectId], schema: InventoryProduct.name})
    products: InventoryProduct[]
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
