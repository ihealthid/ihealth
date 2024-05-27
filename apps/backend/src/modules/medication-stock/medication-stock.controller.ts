import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { MedicationStockInputRequest } from './medication-stock.request';
import { MedicationStock } from './medication-stock';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { MedicationInventory } from '../medication-inventory/medication-inventory';
import { Medication } from '../medication/medication';

@Controller({
  path: 'medication-stocks',
})
export class MedicationStockController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(MedicationStock), {
      sortableColumns: ['createdAt', 'balance', 'expiredAt'],
      filterableColumns: {
        medicationId: [FilterOperator.EQ],
      },
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

      const inventory = trx.create(MedicationInventory, data);
      await trx.save(inventory);

      const medication = await trx.findOne(Medication, {
        where: { id: data.medicationId },
      });
      medication.stock = medication.stock + data.quantity;
      await trx.save(medication);
    });
  }
}
