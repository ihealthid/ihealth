import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Distributor } from './distributor';
import { DistributorInputRequest } from './distributor.request';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'distributors',
})
export class DistributorController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Distributor), {
      sortableColumns: ['name'],
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(Distributor, { id });
  }

  @Post()
  async create(@Body() data: DistributorInputRequest) {
    const distributor = this.entityManager.create(Distributor, data);
    return this.entityManager.save(distributor);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<DistributorInputRequest>,
  ) {
    const distributor = await this.entityManager.findOneByOrFail(Distributor, {
      id,
    });
    const uData = this.entityManager.merge(Distributor, distributor, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const distributor = await this.entityManager.findOneByOrFail(Distributor, {
      id,
    });
    return this.entityManager.remove(distributor);
  }
}
