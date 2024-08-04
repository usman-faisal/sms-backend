import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './repositories/inventory.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { InventoryProductRepository } from './repositories/inventory-product.repository';

@Injectable()
export class InventoryService {
    constructor(private readonly inventoryRepository: InventoryRepository, 
                private readonly inventoryProductRepository: InventoryProductRepository) {}

    async getInventory() {
        let inventory = await this.inventoryRepository.find({}, [{path: 'products'}]);
        if (!inventory[0]) {
            const newInventory = await this.inventoryRepository.create({});
            return newInventory as any;
        }
        return inventory[0];
    }

    async addProduct(createProductDto: CreateProductDto) {
        const newProduct = await this.inventoryProductRepository.create(createProductDto);
        const inventory = await this.getInventory();
        inventory.products.push(newProduct);
        await inventory.save();
        return newProduct;
    }

    async update(productId: string, updateProductDto: Partial<CreateProductDto>) {
        const product = await this.inventoryProductRepository.findOne({ id: productId });

        if (!product) {
            throw new NotFoundException();
        }
        await this.inventoryProductRepository.findOneAndUpdate({id: productId}, updateProductDto)
        return product;
    }

    async deleteProduct(productId: string) {
        const product = await this.inventoryProductRepository.findOne({ id: productId });

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        const inventory = await this.getInventory();
        inventory.products = inventory.products.filter(p => p.id== productId);
        await inventory.save();
        await this.inventoryProductRepository.deleteOne({ id: productId });
        return { message: 'Product successfully deleted' };
    }
}
