import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './repositories/order.repository';
import { OrderItemsRepository } from './repositories/order-item.repository';
import { PlaceOrderDto } from './dto/place-order.dto';
import {  Types } from 'mongoose';
import { SalesmenService } from 'src/salesmen/salesmen.service';
import { AreasRepository } from 'src/areas/repositories/areas.repository';
import { InventoryService } from 'src/inventory/inventory.service';
import { ShopsRepository } from 'src/shops/repositories/shops.repository';
import { InventoryProductRepository } from 'src/inventory/repositories/inventory-product.repository';
import { OrderItem } from './schemas/order-item.schema';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly salesmenService: SalesmenService,
        private readonly areasRepository: AreasRepository,
        private readonly shopsRepository: ShopsRepository,
        private readonly inventory: InventoryService,
        private readonly inventoryProductRepository: InventoryProductRepository
    )
    {}

    async placeOrder(
        userId: Types.ObjectId,
        areaId: string,
        shopId: string,
        placeOrderDto: PlaceOrderDto
    ) {
        await this.salesmenService.doesAreaBelongToSalesman(userId, areaId);
        const {products} = placeOrderDto;
        if(products.length === 0)
        {
            throw new BadRequestException()
        }
        const area = await this.areasRepository.findOne({_id: areaId})
        if(!area.shops.includes(shopId as any))
        {
            throw new BadRequestException()
        }
        const shop = await this.shopsRepository.findOne({_id: shopId})
        const mapToOrderItems: OrderItem[] = []
        for await (const product of products)
        {
            const {id, quantity, price} = product;
            const productInDB = await this.inventoryProductRepository.findOne({_id: id})
            if(!productInDB)
            {
                throw new BadRequestException();
            }
            mapToOrderItems.push({
                product: productInDB,
                quantity,
                price
            });
        }
        const order = await this.ordersRepository.create({items: mapToOrderItems})
        shop.orders.push(order);
        await shop.save();
        return order;
    }
}
