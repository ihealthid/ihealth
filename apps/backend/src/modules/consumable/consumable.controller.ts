import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumableCreateRequest } from './consumable.request';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Consumable } from './consumable';
import { EntityManager } from 'typeorm';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

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
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Consumable), {
      sortableColumns: ['name'],
      relations: {
        brand: {
          manufacture: true,
        },
        formType: true,
      },
    });
  }
}
