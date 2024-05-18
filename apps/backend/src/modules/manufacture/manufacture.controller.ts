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
import { Repository } from 'typeorm';
import { Manufacture } from './manufacture';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'manufactures',
})
export class ManufactureController {
  constructor(
    @InjectRepository(Manufacture)
    private manufactureRepository: Repository<Manufacture>,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.manufactureRepository.findAndCount({
      ...pagination,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.manufactureRepository.findOneByOrFail({ id });
  }

  @Post()
  async create(@Body() data: any) {
    const manufacture = this.manufactureRepository.create(data);
    return this.manufactureRepository.save(manufacture);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const manufacture = await this.manufactureRepository.findOneByOrFail({
      id,
    });
    const uData = this.manufactureRepository.merge(manufacture, data);
    return this.manufactureRepository.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const manufacture = await this.manufactureRepository.findOneByOrFail({
      id,
    });
    await this.manufactureRepository.remove(manufacture);
  }
}
