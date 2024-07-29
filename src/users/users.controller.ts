import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto.request';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('local'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete()
  async deleteUser(@Query('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
