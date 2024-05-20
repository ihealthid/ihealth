import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ConsumableStock } from './consumable-stock';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { ConsumableStockInput } from './consumable-stock.request';

@Controller({
  path: 'consumable-stocks',
})
export class ConsumableStockController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.entityManager.findAndCount(ConsumableStock, {
      ...pagination,
    });
  }

  @Post()
  async create(@Body() data: ConsumableStockInput) {
    const {
      packaging: { pcs, packs = 1, boxes = 1, cartons = 1 },
      consumableId,
      ...restData
    } = data;

    const quantity = pcs * packs * boxes * cartons;

    let balance = quantity;

    return this.entityManager.transaction(async (trx) => {
      const prevItem = await trx.findOne(ConsumableStock, {
        where: {
          consumableId,
        },
        order: {
          createdAt: 'desc',
        },
      });

      if (prevItem) {
        balance += prevItem.balance;
      }

      const stock = trx.create(ConsumableStock, {
        ...restData,
        consumableId,
        quantity,
        balance,
      });

      return trx.save(stock);
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const item = await this.entityManager.findOneByOrFail(ConsumableStock, {
      id,
    });
    return this.entityManager.remove(item);
  }
}
