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
import { EncounterStatus } from './encounter-status';

@Controller({
  path: 'encounter-statuses',
})
export class EncounterStatusController {
  constructor(
    @InjectRepository(EncounterStatus)
    private encounterStatusRepository: Repository<EncounterStatus>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.encounterStatusRepository.findAndCount({
      take,
      skip,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.encounterStatusRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const encounterStatus = this.encounterStatusRepository.create(data);
    return this.encounterStatusRepository.save(encounterStatus);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const encounterStatus =
      await this.encounterStatusRepository.findOneByOrFail({
        id,
      });
    const uData = this.encounterStatusRepository.merge(encounterStatus, data);
    return this.encounterStatusRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const encounterStatus =
      await this.encounterStatusRepository.findOneByOrFail({
        id,
      });
    await this.encounterStatusRepository.remove(encounterStatus);
    return encounterStatus;
  }
}
