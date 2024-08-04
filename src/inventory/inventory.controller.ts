import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { InventoryService } from './inventory.service';
import { CurrentUser } from 'src/users/current-user.decorator';
import { CreateProductDto } from './dto/create-product.dto';

@Roles('admin')
@UseGuards(AuthGuard('local'), RoleGuard)
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService){}

    @Get()
    getInventory()
    {
        return this.inventoryService.getInventory();
    }

    @Post()
    addInventoryProduct(
        @Body() createProductDto: CreateProductDto
    ) {
        this.inventoryService.addProduct(createProductDto)
    }
}
