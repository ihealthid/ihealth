import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { MaritalStatus } from './marital-status';

@Controller({
  path: 'marital-statuses',
})
export class MaritalStatusController {
  constructor(
    @InjectRepository(MaritalStatus)
    private maritalStatusRepository: Repository<MaritalStatus>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.maritalStatusRepository.findAndCount({
      take,
      skip,
      order: {
        display: 'ASC'
      }
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.maritalStatusRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const maritalStatus = this.maritalStatusRepository.create(data);
    return this.maritalStatusRepository.save(maritalStatus);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const maritalStatus = await this.maritalStatusRepository.findOneByOrFail({
      id,
    });
    const uData = this.maritalStatusRepository.merge(maritalStatus, data);
    return this.maritalStatusRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const maritalStatus = await this.maritalStatusRepository.findOneByOrFail({
      id,
    });
    await this.maritalStatusRepository.remove(maritalStatus);
    return maritalStatus;
  }
}
