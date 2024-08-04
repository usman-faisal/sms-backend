import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsRepository } from './repositories/shops.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { UsersModule } from 'src/users/users.module';
import { AreasModule } from 'src/areas/areas.module';
import { SalesmenModule } from 'src/salesmen/salesmen.module';

@Module({
  imports: [
    UsersModule,
    AreasModule,
    SalesmenModule,
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService, ShopsRepository],
  exports: [ShopsService, ShopsRepository],

})
export class ShopsModule {}
