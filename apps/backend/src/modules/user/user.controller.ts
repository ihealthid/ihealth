import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserCreateRequest } from './user.request';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './user';
import { EntityManager, In } from 'typeorm';
import { Role } from '../role/role';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

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
    @Body() { roles, password, ...data }: UserCreateRequest,
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
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(User), {
      sortableColumns: ['fullName', 'username'],
      filterableColumns: {
        username: [FilterOperator.ILIKE],
      },
      relations: {
        roles: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(User, {
      where: {
        id,
      },
      relations: {
        roles: true,
      },
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() { password, ...data }: Partial<UserCreateRequest>,
  ) {
    const user = await this.entityManager.findOneOrFail(User, {
      where: {
        id,
      },
      relations: {
        roles: true,
      },
    });

    let roles: Role[] = [];

    if (data.roles?.length > 0) {
      roles = await this.entityManager.find(Role, {
        where: { id: In(data.roles) },
      });
    }

    const uData = this.entityManager.merge(User, user, {
      ...data,
      roles,
      password: password
        ? bcrypt.hashSync(password, bcrypt.genSaltSync())
        : undefined,
    });
    await this.entityManager.save(uData);
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
