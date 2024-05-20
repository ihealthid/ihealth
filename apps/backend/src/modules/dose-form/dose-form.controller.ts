import { InjectEntityManager } from '@nestjs/typeorm';
import { DoseForm } from './dose-form';
import { EntityManager } from 'typeorm';
import { Controller, Get } from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'dose-forms',
})
export class DoseFormController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(DoseForm, paginationQuery);
  }
}
