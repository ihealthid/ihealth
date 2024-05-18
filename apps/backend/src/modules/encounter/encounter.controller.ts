import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EncounterInputRequest } from './encounter.request';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Encounter } from './encounter';
import { DataSource, Repository } from 'typeorm';
import { Patient } from '../patient/patient';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { Participant } from '../participant/participant';
import { ParticipantTypeCode } from '../participant-type-code/participant-type-code';
import { ActEncounterCode } from '../act-encounter-code/act-encounter-code';
import { EncounterStatus } from '../encounter-status/encounter-status';
import { PatientCondition } from '../patient-condition/patient-condition';
import { HealthcareService } from '../healthcare-service/healthcare-service';

@Controller({
  path: 'encounters',
})
export class EncounterController {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(PatientCondition)
    private patientConditionRepository: Repository<PatientCondition>,
    @InjectRepository(HealthcareService)
    private healthcareServiceRepository: Repository<HealthcareService>,
    @InjectRepository(Encounter)
    private encounterRepository: Repository<Encounter>,
    @InjectRepository(EncounterStatus)
    private encounterStatusRepository: Repository<EncounterStatus>,
    @InjectRepository(ParticipantTypeCode)
    private participantTypeCodeRepository: Repository<ParticipantTypeCode>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(EncounterHistory)
    private encounterHistoryRepository: Repository<EncounterHistory>,
    @InjectRepository(ActEncounterCode)
    private actEncounterCodeRepository: Repository<ActEncounterCode>,
    private dataSource: DataSource,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async paginate(@Pagination() { take, skip, filter }: PaginationQuery) {
    return this.encounterRepository.findAndCount({
      take,
      skip,
      where: filter,
      relations: {
        patient: true,
        healthcareService: true,
        patientCondition: true,
        histories: {
          status: true,
        },
      },
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() data: EncounterInputRequest) {
    await this.dataSource.transaction(async (trx) => {
      const patient = await this.patientRepository.findOneByOrFail({
        id: data.patientId,
      });

      const patientCondition =
        await this.patientConditionRepository.findOneByOrFail({
          id: data.patientConditionId,
        });

      const participantType =
        await this.participantTypeCodeRepository.findOneByOrFail({
          code: 'ADM',
        });

      const actEncounterCode =
        await this.actEncounterCodeRepository.findOneByOrFail({
          code: 'AMB',
        });

      const healthcareService =
        await this.healthcareServiceRepository.findOneByOrFail({
          id: data.healthcareServiceId,
        });

      const encounter = this.encounterRepository.create({
        patient,
        actEncounterCode,
        healthcareService,
        periodStart: new Date(),
        patientCondition,
      });
      await trx.save(encounter);

      const participant = this.participantRepository.create({
        encounterId: encounter.id,
        userId: req.user.sub,
        type: participantType,
      });
      await trx.save(participant);

      const status = await this.encounterStatusRepository.findOneByOrFail({
        code: 'registered',
      });

      const history = this.encounterHistoryRepository.create({
        status,
        encounter,
      });
      await trx.save(history);
    });
  }
}
