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
import { RoleCreateRequest } from './role.request';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from './role';
import { EntityManager } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: '/roles',
})
export class RoleController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: RoleCreateRequest) {
    const role = this.entityManager.create(Role, data);
    return this.entityManager.save(role);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Partial<RoleCreateRequest>,
  ) {
    const role = await this.entityManager.findOneByOrFail(Role, { id });
    const uData = this.entityManager.merge(Role, role, data);
    return this.entityManager.save(uData);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(Role, { id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Role), {
      sortableColumns: ['name'],
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const role = await this.entityManager.findOneByOrFail(Role, { id });
    await this.entityManager.delete(Role, role);
  }
}
