import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './repositories/inventory.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { InventroyProductSchema, InventoryProduct } from './schemas/inventory-product.schema';
import { InventoryProductRepository } from './repositories/inventory-product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: InventorySchema, name: Inventory.name},
      {schema: InventroyProductSchema, name: InventoryProduct.name}
    ])
  ],
  providers: [InventoryService, InventoryRepository, InventoryProductRepository],
  controllers: [InventoryController],
  exports: [InventoryRepository, InventoryService, InventoryProductRepository]
})
export class InventoryModule {}
