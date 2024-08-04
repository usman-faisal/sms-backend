import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SalesmenModule } from 'src/salesmen/salesmen.module';
import { OrdersRepository } from './repositories/order.repository';
import { OrderItemsRepository } from './repositories/order-item.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';
import { AreasModule } from 'src/areas/areas.module';
import { ShopsModule } from 'src/shops/shops.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    SalesmenModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      }, 
      {
        name: OrderItem.name,
        schema: OrderItemSchema
      }
    ]),
    AreasModule,
    ShopsModule,
    InventoryModule
  ],
  providers: [OrdersService, OrdersRepository, OrderItemsRepository],
  controllers: [OrdersController]
})
export class OrdersModule {}
