import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CurrentUser } from 'src/users/current-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthUser } from 'src/auth/types';
import { CreateAreaDto } from './dto/create-area.request.dto';

@UseGuards(AuthGuard('local'))
@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Roles('user')
  @UseGuards(RoleGuard)
  @Get('my-areas')
  async getAreas(@CurrentUser() user: AuthUser) {
    return this.areasService.getAreas(user.id);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('areas')
  async addArea(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.addArea(createAreaDto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('areas/available')
  async getAvailableAreas(@Query('id') id: string) {
    return this.areasService.getAvailableAreas(id);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('areas')
  get() {
    return this.areasService.getAllAreas();
  }
}
