import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumableCreateRequest } from './consumable.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumable } from './consumable';
import { Repository } from 'typeorm';

@Controller({
  path: 'consumables',
})
export class ConsumableController {
  constructor(
    @InjectRepository(Consumable)
    private consumableRepository: Repository<Consumable>,
  ) {}

  @Post()
  async create(@Body() data: ConsumableCreateRequest) {
    const consumable = this.consumableRepository.create(data);
    return this.consumableRepository.save(consumable);
  }

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.consumableRepository.findAndCount({
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
