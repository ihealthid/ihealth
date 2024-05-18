import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand';
import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'brands',
})
export class BrandController {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.brandRepository.findAndCount({
      ...pagination,
      relations: {
        manufacture: true,
      },
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.brandRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        manufacture: true,
      },
    });
  }

  @Post()
  async create(@Body() data: any) {
    const brand = this.brandRepository.create(data);
    return this.brandRepository.save(brand);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const brand = await this.brandRepository.findOneByOrFail({ id });
    const uData = this.brandRepository.merge(brand, data);
    return this.brandRepository.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandRepository.findOneByOrFail({ id });
    return this.brandRepository.remove(brand);
  }
}
