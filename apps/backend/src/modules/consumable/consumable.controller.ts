import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumableCreateRequest } from './consumable.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Consumable } from './consumable';
import { EntityManager } from 'typeorm';

@Controller({
  path: 'consumables',
})
export class ConsumableController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  async create(@Body() data: ConsumableCreateRequest) {
    const consumable = this.entityManager.create(Consumable, data);
    return this.entityManager.save(consumable);
  }

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.entityManager.findAndCount(Consumable, {
      ...pagination,
      relations: {
        brand: {
          manufacture: true,
        },
        formType: true,
      },
    });
  }
}
