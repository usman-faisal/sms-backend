import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Area } from 'src/areas/schemas/area.schema';
import { User } from 'src/users/schemas/user.schema';

export type SalesmanDocument = Salesman & Document;

@Schema()
export class Salesman {
  @Prop({ type: Types.ObjectId, ref: User.name, unique: true })
  user: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: Area.name, unique: false })
  areas: Types.ObjectId[];
}

export const SalesmanSchema = SchemaFactory.createForClass(Salesman);
