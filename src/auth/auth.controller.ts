import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/users/current-user.decorator';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { AuthUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Get('me')
  async me(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Roles('admin-me')
  @UseGuards(AuthGuard('local'), RoleGuard)
  @Get('admin-me')
  async admineMe(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login-admin')
  async loginAdmin(@Body() loginDto: LoginDto) {
    return this.authService.loginAdmin(loginDto);
  }
}
