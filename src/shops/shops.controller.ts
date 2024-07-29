import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { CurrentUser } from 'src/users/current-user.decorator';
import { AuthUser } from 'src/auth/types';
import { CreateShopDto } from './dto/create-shop.request.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('local'))
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Roles('user')
  @UseGuards(RoleGuard)
  @Post()
  async createShop(
    @Query('areaId') areaId: string,
    @Body() createShopDto: CreateShopDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.shopsService.createShop(createShopDto, user.id, areaId);
  }

  @Roles('user')
  @UseGuards(RoleGuard)
  @Get()
  async getShopsByArea(
    @CurrentUser() user: AuthUser,
    @Query('areaId') areaId: string,
  ) {
    return this.shopsService.getShopsByArea(user.id, areaId);
  }

  @Roles('user')
  @UseGuards(RoleGuard)
  @Delete()
  async deleteShop(
    @Query('areaId') areaId: string,
    @Query('shopId') shopId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.shopsService.deleteShop(user.id, areaId, shopId);
  }

  @Roles('user')
  @UseGuards(RoleGuard)
  @Put()
  async updateShop(
    @Query('areaId') areaId: string,
    @Query('shopId') shopId: string,
    @Body() updateShopDto: CreateShopDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.shopsService.updateShop(user.id, areaId, shopId, updateShopDto);
  }
}
