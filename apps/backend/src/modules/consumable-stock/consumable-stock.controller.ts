import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private dataSource: DataSource,
    @InjectRepository(ConsumableStock)
    private consumableStockRepository: Repository<ConsumableStock>,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.consumableStockRepository.findAndCount({
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

    const quantity = pcs * packs * boxes * cartons 
    
    let balance = quantity;

    return this.dataSource.transaction(async (trx) => {
      const prevItem = await this.consumableStockRepository.findOne({
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

      const stock = this.consumableStockRepository.create({
        ...restData,
        consumableId,
        quantity,
        balance,
      });

      return trx.save(stock);
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const item = await this.consumableStockRepository.findOneByOrFail({ id });
    return this.consumableStockRepository.remove(item);
  }
}
