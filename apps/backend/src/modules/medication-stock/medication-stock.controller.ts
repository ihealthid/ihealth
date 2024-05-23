import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { MedicationStockInputRequest } from './medication-stock.request';
import { MedicationStock } from './medication-stock';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { Procurement } from '../procurement/procurement';

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
    await this.entityManager.transaction(async (trx) => {
      const stock = trx.create(MedicationStock, data);
      await this.entityManager.save(stock);

      const procurement = trx.create(Procurement, {
        distributorId: data.distributorId,
      });
      await trx.save(procurement);
    });
  }
}
