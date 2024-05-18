import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { MedicationStockInputRequest } from './medication-stock.request';
import { MedicationStock } from './medication-stock';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'medication-stocks',
})
export class MedicationStockController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(MedicationStock, {
      ...paginationQuery,
      relations: {
        medication: true,
      },
    });
  }

  @Post()
  async create(@Body() data: MedicationStockInputRequest) {
    const batch = this.entityManager.create(MedicationStock, data);
    return this.entityManager.save(batch);
  }
}
