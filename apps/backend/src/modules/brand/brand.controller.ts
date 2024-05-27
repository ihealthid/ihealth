import { InjectEntityManager } from '@nestjs/typeorm';
import { Brand } from './brand';
import { EntityManager } from 'typeorm';
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
import { BrandInputRequest } from './brand.request';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: 'brands',
})
export class BrandController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Brand), {
      sortableColumns: ['name'],
      relations: {
        manufacture: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: BrandInputRequest) {
    const brand = this.entityManager.create(Brand, data);
    return this.entityManager.save(brand);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Partial<BrandInputRequest>,
  ) {
    const brand = await this.entityManager.findOneByOrFail(Brand, { id });
    const uData = this.entityManager.merge(Brand, brand, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const brand = await this.entityManager.findOneByOrFail(Brand, { id });
    return this.entityManager.remove(brand);
  }
}
