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
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { EntityManager, FindOneOptions, In, Repository } from 'typeorm';
import { Role } from '../role/role';

@Controller({
  path: 'users',
})
export class UserController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() { fullName, roles, password, ...data }: UserCreateRequest,
  ) {
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const user = this.entityManager.create(User, {
      ...data,
      password: encryptedPassword,
    });

    user.roles = await this.entityManager.find(Role, {
      where: {
        id: In(roles),
      },
    });

    return this.entityManager.save(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(User, {
      ...paginationQuery,
      relations: {
        roles: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string) {
    const user = await this.entityManager.findOneOrFail(User, {
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const user = await this.entityManager.findOneByOrFail(User, {
      id,
    });

    return this.entityManager.delete(User, user);
  }
}
