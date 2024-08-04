import { Prop } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export class PlaceOrderDto {
    @IsArray()
    products: {
        id: string;
        quantity: number;
        price: number;
    }[]
}
