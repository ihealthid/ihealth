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
import { EncounterAct } from './encounter-act';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'encounter-acts',
})
export class EncounterActController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(EncounterAct), {
      sortableColumns: ['code', 'display'],
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(EncounterAct, {
      where: { id },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const encounterAct = this.entityManager.create(EncounterAct, data);
    return this.entityManager.save(encounterAct);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any) {
    const encounterAct = await this.entityManager.findOneOrFail(EncounterAct, {
      where: {
        id,
      },
    });

    const merged = this.entityManager.merge(EncounterAct, encounterAct, data);
    return this.entityManager.save(merged);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.entityManager.softDelete(EncounterAct, { id });
  }
}
