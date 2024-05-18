import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EncounterStatus } from '../encounter-status';
import { FindEncounterStatusByCode } from '../queries/find-encounter-status-by-code';

@QueryHandler(FindEncounterStatusByCode)
export class FindEncounterStatusByCodeHandler
  implements IQueryHandler<FindEncounterStatusByCode>
{
  constructor(
    @InjectRepository(EncounterStatus)
    private repository: Repository<EncounterStatus>,
  ) {}

  async execute(command: FindEncounterStatusByCode) {
    return this.repository.findOneByOrFail({ code: command.code });
  }
}
