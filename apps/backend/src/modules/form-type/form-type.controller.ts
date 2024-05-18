import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormType } from './form-type';
import { Repository } from 'typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'form-types',
})
export class FormTypeController {
  constructor(
    @InjectRepository(FormType)
    private formTypeRepository: Repository<FormType>,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.formTypeRepository.findAndCount({
      ...pagination,
    });
  }
}
