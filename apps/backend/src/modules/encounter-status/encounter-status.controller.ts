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
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { EncounterStatus } from './encounter-status';
import { FilterOperator, Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'encounter-statuses',
})
export class EncounterStatusController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(EncounterStatus), {
      nullSort: 'last',
      sortableColumns: ['code', 'display'],
      filterableColumns: {
        order: [FilterOperator.LTE]
      }
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(EncounterStatus, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const encounterStatus = this.entityManager.create(EncounterStatus, data);
    return this.entityManager.save(encounterStatus);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const encounterStatus = await this.entityManager.findOneByOrFail(
      EncounterStatus,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      EncounterStatus,
      encounterStatus,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const encounterStatus = await this.entityManager.findOneByOrFail(
      EncounterStatus,
      {
        id,
      },
    );
    await this.entityManager.remove(encounterStatus);
    return encounterStatus;
  }
}
