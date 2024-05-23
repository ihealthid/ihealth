import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { EntityManager } from 'typeorm';
import { Distributor } from './distributor';
import { DistributorInputRequest } from './distributor.request';

@Controller({
  path: 'distributors',
})
export class DistributorController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Distributor, paginationQuery);
  }

  @Post()
  async create(@Body() data: DistributorInputRequest) {
    const distributor = this.entityManager.create(Distributor, data);
    return this.entityManager.save(distributor);
  }
}
