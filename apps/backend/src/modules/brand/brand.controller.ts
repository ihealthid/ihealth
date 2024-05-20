import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand';
import { EntityManager, Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'brands',
})
export class BrandController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.entityManager.findAndCount(Brand, {
      ...pagination,
      relations: {
        manufacture: true,
      },
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(Brand, {
      where: {
        id,
      },
      relations: {
        manufacture: true,
      },
    });
  }

  @Post()
  async create(@Body() data: any) {
    const brand = this.entityManager.create(Brand, data);
    return this.entityManager.save(brand);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const brand = await this.entityManager.findOneByOrFail(Brand, { id });
    const uData = this.entityManager.merge(Brand, brand, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const brand = await this.entityManager.findOneByOrFail(Brand, { id });
    return this.entityManager.remove(brand);
  }
}
