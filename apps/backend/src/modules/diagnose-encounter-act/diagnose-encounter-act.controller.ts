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
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { DiagnoseEncounterAct } from './diagnose-encounter-act';
import { DiagnoseEncounterActInputRequest } from './diagnose-encounter-act.request';

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
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(DiagnoseEncounterAct, {
      ...paginationQuery,
      relations: {
        encounter: true,
        encounterAct: true,
        user: true,
        consumable: true,
      },
    });
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
