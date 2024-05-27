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
import { PatientCondition } from './patient-condition';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'patient-conditions',
})
export class PatientConditionController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(PatientCondition), {
      sortableColumns: ['display'],
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(PatientCondition, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const patientCondition = this.entityManager.create(PatientCondition, data);
    return this.entityManager.save(patientCondition);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const patientCondition = await this.entityManager.findOneByOrFail(
      PatientCondition,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      PatientCondition,
      patientCondition,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const patientCondition = await this.entityManager.findOneByOrFail(
      PatientCondition,
      {
        id,
      },
    );
    await this.entityManager.remove(patientCondition);
  }
}
