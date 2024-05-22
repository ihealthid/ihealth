import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { EntityManager } from 'typeorm';
import { EncounterActConsumable } from './encounter-act-consumable';
import { EncounterActConsumableInputRequest } from './encounter-act-consumable.request';

@Controller({
  path: 'encounter-act-consumables',
})
export class EncounterActConsumableController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(EncounterActConsumable, {
      ...paginationQuery,
      relations: {
        consumable: true,
        encounterAct: true,
      },
    });
  }

  @Post()
  async create(@Body() data: EncounterActConsumableInputRequest) {
    const consumable = this.entityManager.create(EncounterActConsumable, data);
    return this.entityManager.save(consumable);
  }
}
