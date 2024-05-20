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
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { ActEncounterCode } from './act-encounter-code';

@Controller({
  path: 'act-encounter-codes',
})
export class ActEncounterCodeController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(ActEncounterCode, paginationQuery);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(ActEncounterCode, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const actEncounterCode = this.entityManager.create(ActEncounterCode, data);
    return this.entityManager.save(actEncounterCode);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const actEncounterCode = await this.entityManager.findOneByOrFail(
      ActEncounterCode,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      ActEncounterCode,
      actEncounterCode,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const actEncounterCode = await this.entityManager.findOneByOrFail(
      ActEncounterCode,
      {
        id,
      },
    );
    await this.entityManager.remove(actEncounterCode);
    return actEncounterCode;
  }
}
