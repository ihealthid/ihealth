import { InjectRepository } from '@nestjs/typeorm';
import { Observation } from './observation';
import { DataSource, Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { ObservationEntry } from '../observation-entry/observation-entry';
import { ObservationEntryInput } from '../observation-entry/observation-entry.request';
import { ObservationUpdateInput } from './observation.request';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { EncounterStatus } from '../encounter-status/encounter-status';

@Controller({
  path: 'observations',
})
export class ObservationController {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Observation)
    private observationRepository: Repository<Observation>,
    @InjectRepository(ObservationEntry)
    private observationEntryRepository: Repository<ObservationEntry>,
    @InjectRepository(EncounterHistory)
    private encounterHistoryRepository: Repository<EncounterHistory>,
    @InjectRepository(EncounterStatus)
    private encounterStatusRepository: Repository<EncounterStatus>,
  ) {}

  @Get()
  async paginate(@Pagination() { take, skip, filter }: PaginationQuery) {
    return this.observationRepository.findAndCount({
      take,
      skip,
      where: filter,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.observationRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  @Get('/encounter/:id')
  async findByEncounterId(@Param('id', ParseIntPipe) id: number) {
    const observation = await this.observationRepository.findOne({
      where: {
        encounterId: id,
      },
      relations: {
        entries: true,
      },
    });

    if (!observation) {
      const data = this.observationRepository.create({
        encounterId: id,
      });
      return this.observationRepository.save(data);
    }

    return observation;
  }

  @Post()
  async create(@Body() data: any) {
    const observation = this.observationRepository.create({
      encounterId: data.encounterId,
    });
    return this.observationRepository.save(observation);
  }

  @Post(':id/entry')
  async upsertEntry(
    @Param(':id', ParseIntPipe) observationId: number,
    @Body() data: ObservationEntryInput,
  ) {
    return this.observationEntryRepository.upsert(
      {
        observationId,
        ...data,
      },
      ['observationId', 'code'],
    );
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Record<string, any>,
  ) {
    const observation = await this.observationRepository.findOneOrFail({
      where: {
        encounterId: id,
      },
    });

    await this.dataSource.transaction(async (trx) => {
      for (const [key, value] of Object.entries(data)) {
        const entry = this.observationEntryRepository.create({
          observationId: observation.id,
          code: key,
          type: typeof value,
          value: value.toString(),
        });
        await trx.save(entry);
      }

      const status = await this.encounterStatusRepository.findOneByOrFail({
        code: 'observed',
      });

      const history = this.encounterHistoryRepository.create({
        encounterId: id,
        status,
      });

      await trx.save(history);
    });
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const observation = await this.observationRepository.findOneByOrFail({
      id,
    });
    await this.observationRepository.remove(observation);
  }
}
