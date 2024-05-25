import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DiagnoseEncounterAct } from './diagnose-encounter-act';
import { DiagnoseEncounterActInputRequest } from './diagnose-encounter-act.request';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'diagnose-encounter-acts',
})
export class DiagnoseEncounterActController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(
      query,
      this.entityManager.getRepository(DiagnoseEncounterAct),
      {
        sortableColumns: ['createdAt'],
        relations: {
          encounter: true,
          encounterAct: true,
          user: true,
          consumable: true,
        },
      },
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    data: DiagnoseEncounterActInputRequest,
  ) {
    const act = this.entityManager.create(DiagnoseEncounterAct, data);
    return this.entityManager.save(act);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const act = await this.entityManager.findOneByOrFail(DiagnoseEncounterAct, {
      id,
    });
    await this.entityManager.remove(act);
  }
}
