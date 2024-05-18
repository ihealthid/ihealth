import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEncounterStatusById } from '../queries/find-encounter-status-by-id';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EncounterStatus } from '../encounter-status';

@QueryHandler(FindEncounterStatusById)
export class FindEncounterStatusByIdHandler
  implements IQueryHandler<FindEncounterStatusById>
{
  constructor(
    @InjectRepository(EncounterStatus)
    private repository: Repository<EncounterStatus>,
  ) {}

  async execute(command: FindEncounterStatusById) {
    return this.repository.findOneByOrFail({ id: command.id });
  }
}
