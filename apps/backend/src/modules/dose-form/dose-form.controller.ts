import { InjectRepository } from '@nestjs/typeorm';
import { DoseForm } from './dose-form';
import { Repository } from 'typeorm';
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
    @InjectRepository(DoseForm)
    private doseFormRepository: Repository<DoseForm>,
  ) {}

  @Get()
  async paginate(@Pagination() { take, skip, filter, sort }: PaginationQuery) {
    return this.doseFormRepository.findAndCount({
      take,
      skip,
      where: filter,
      order: sort,
    });
  }
}
