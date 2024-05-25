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
import { InjectEntityManager } from '@nestjs/typeorm';
import { Encounter } from './encounter';
import { EntityManager } from 'typeorm';
import { Patient } from '../patient/patient';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { Participant } from '../participant/participant';
import { ParticipantTypeCode } from '../participant-type-code/participant-type-code';
import { EncounterStatus } from '../encounter-status/encounter-status';
import { PatientCondition } from '../patient-condition/patient-condition';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

@Controller({
  path: 'encounters',
})
export class EncounterController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Encounter), {
      nullSort: 'last',
      sortableColumns: ['createdAt', 'patientCondition.code'],
      filterableColumns: {
        createdAt: [FilterOperator.BTW],
        'patient.fullName': [FilterOperator.ILIKE],
        'status.id': [FilterOperator.IN],
      },
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
    await this.entityManager.transaction(async (trx) => {
      const patient = await trx.findOneByOrFail(Patient, {
        id: data.patientId,
      });

      const patientCondition = await trx.findOneByOrFail(PatientCondition, {
        id: data.patientConditionId,
      });

      const participantType = await trx.findOneByOrFail(ParticipantTypeCode, {
        code: 'ADM',
      });

      const healthcareService = await trx.findOneByOrFail(HealthcareService, {
        id: data.healthcareServiceId,
      });

      const encounter = trx.create(Encounter, {
        patient,
        healthcareService,
        periodStart: new Date(),
        patientCondition,
      });
      await trx.save(encounter);

      const participant = trx.create(Participant, {
        encounterId: encounter.id,
        userId: req.user.sub,
        type: participantType,
      });
      await trx.save(participant);

      const status = await this.entityManager.findOneByOrFail(EncounterStatus, {
        code: 'registered',
      });

      const history = trx.create(EncounterHistory, {
        status,
        encounter,
      });
      await trx.save(history);
    });
  }
}
