import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserCreateRequest } from './user.request';
import * as bcrypt from 'bcrypt';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { contains } from 'src/helpers/search-contains';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Role } from '../role/role';

@Controller({
  path: 'users',
})
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() { fullName, roles, password, ...data }: UserCreateRequest,
  ) {
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const user = this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });

    user.roles = await this.roleRepository.find({
      where: {
        id: In(roles),
      },
    });

    return this.userRepository.save(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip, filter }: PaginationQuery) {
    return this.userRepository.findAndCount({
      take,
      skip,
      where: filter,
      relations: {
        roles: true,
      },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userRepository.findOneByOrFail({
      id,
    });

    return this.userRepository.delete(user);
  }
}
