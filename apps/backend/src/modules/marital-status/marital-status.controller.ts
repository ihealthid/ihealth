import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MaritalStatus } from './marital-status';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'marital-statuses',
})
export class MaritalStatusController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(MaritalStatus), {
      sortableColumns: ['code', 'display'],
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(MaritalStatus, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const maritalStatus = this.entityManager.create(MaritalStatus, data);
    return this.entityManager.save(maritalStatus);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const maritalStatus = await this.entityManager.findOneByOrFail(
      MaritalStatus,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(MaritalStatus, maritalStatus, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const maritalStatus = await this.entityManager.findOneByOrFail(
      MaritalStatus,
      {
        id,
      },
    );
    await this.entityManager.remove(maritalStatus);
    return maritalStatus;
  }
}
