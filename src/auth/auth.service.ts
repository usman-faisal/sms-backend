import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { AuthUser } from './types';
import { LoginDto } from './dto/login.dto';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(jwtPayload: AuthUser): Promise<any> {
    const { username } = jwtPayload;
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return {
        username: user.username,
        role: user.role,
        id: user._id,
      };
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      username: loginDto.username,
    });
    if (!user || user.password !== loginDto.password) {
      throw new BadRequestException('Invalid username or password');
    }
    const payload: AuthUser = {
      username: user.username,
      id: user._id as Types.ObjectId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginAdmin(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      username: loginDto.username,
    });
    if (!user || user.password !== loginDto.password || user.role !== 'admin') {
      throw new BadRequestException('Invalid username or password');
    }
    console.log(user, 'aaaa');
    const payload: AuthUser = {
      username: user.username,
      id: user._id as Types.ObjectId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
