import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SalesmenService } from './salesmen.service';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@UseGuards(AuthGuard('local'))
@Controller('salesmen')
export class SalesmenController {
  constructor(private readonly salesmenService: SalesmenService) {}

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createSalesmanDto: CreateSalesmanDto) {
    return this.salesmenService.create(createSalesmanDto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  get() {
    return this.salesmenService.findAll();
  }

  @Get()
  findAll() {
    return this.salesmenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesmenService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalesmanDto: UpdateSalesmanDto,
  ) {
    return this.salesmenService.update(id, updateSalesmanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesmenService.remove(+id);
  }
}
