import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InventoryDocument = InventoryProduct & Document;

@Schema()
export class InventoryProduct {
    @Prop({unique: true})
    name: string;
    
    @Prop()
    quantity: number;

    @Prop()
    price: number;
}

export const InventroyProductSchema = SchemaFactory.createForClass(InventoryProduct);
