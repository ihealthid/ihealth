import { InjectEntityManager } from '@nestjs/typeorm';
import { Observation } from './observation';
import { EntityManager } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { ObservationEntry } from '../observation-entry/observation-entry';
import { ObservationEntryInput } from '../observation-entry/observation-entry.request';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { EncounterStatus } from '../encounter-status/encounter-status';

@Controller({
  path: 'observations',
})
export class ObservationController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Observation, paginationQuery);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(Observation, {
      where: {
        id,
      },
    });
  }

  @Get('/encounter/:id')
  async findByEncounterId(@Param('id') id: string) {
    const observation = await this.entityManager.findOne(Observation, {
      where: {
        encounterId: id,
      },
      relations: {
        entries: true,
      },
    });

    if (!observation) {
      const data = this.entityManager.create(Observation, {
        encounterId: id,
      });
      return this.entityManager.save(data);
    }

    return observation;
  }

  @Post()
  async create(@Body() data: any) {
    const observation = this.entityManager.create(Observation, {
      encounterId: data.encounterId,
    });
    return this.entityManager.save(observation);
  }

  @Post(':id/entry')
  async upsertEntry(
    @Param('id') observationId: string,
    @Body() data: ObservationEntryInput,
  ) {
    return this.entityManager.upsert(
      ObservationEntry,
      {
        observationId,
        ...data,
      },
      ['observationId', 'code'],
    );
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: Record<string, any>) {
    const observation = await this.entityManager.findOneOrFail(Observation, {
      where: {
        encounterId: id,
      },
    });

    await this.entityManager.transaction(async (trx) => {
      for (const [key, value] of Object.entries(data)) {
        const entry = this.entityManager.create(ObservationEntry, {
          observationId: observation.id,
          code: key,
          type: typeof value,
          value: value.toString(),
        });
        await trx.save(entry);
      }

      const status = await this.entityManager.findOneByOrFail(EncounterStatus, {
        code: 'observed',
      });

      const history = this.entityManager.create(EncounterHistory, {
        encounterId: id,
        status,
      });

      await trx.save(history);
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id) {
    const observation = await this.entityManager.findOneByOrFail(Observation, {
      id,
    });
    await this.entityManager.remove(observation);
  }
}
