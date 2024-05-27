import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Manufacture } from './manufacture';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'manufactures',
})
export class ManufactureController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Manufacture), {
      sortableColumns: ['name'],
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(Manufacture, { id });
  }

  @Post()
  async create(@Body() data: any) {
    const manufacture = this.entityManager.create(Manufacture, data);
    return this.entityManager.save(manufacture);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const manufacture = await this.entityManager.findOneByOrFail(Manufacture, {
      id,
    });
    const uData = this.entityManager.merge(Manufacture, manufacture, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const manufacture = await this.entityManager.findOneByOrFail(Manufacture, {
      id,
    });
    await this.entityManager.remove(manufacture);
  }
}
