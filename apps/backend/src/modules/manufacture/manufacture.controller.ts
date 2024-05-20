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
import { EntityManager, Repository } from 'typeorm';
import { Manufacture } from './manufacture';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'manufactures',
})
export class ManufactureController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Manufacture, {
      ...paginationQuery,
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
