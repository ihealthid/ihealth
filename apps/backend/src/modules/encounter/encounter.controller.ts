import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EncounterInputRequest } from './encounter.request';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Encounter } from './encounter';
import { EntityManager } from 'typeorm';
import { Patient } from '../patient/patient';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { EncounterStatus } from '../encounter-status/encounter-status';
import { PatientCondition } from '../patient-condition/patient-condition';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentMethod } from '../payment-method/payment-method';
import { Payment } from '../payment/payment';
import { PaymentStatus } from '../payment-status/payment-status';
import { EncounterPayment } from '../encounter-payment/encounter-payment';

@Controller({
  path: 'encounters',
})
export class EncounterController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Encounter), {
      nullSort: 'last',
      sortableColumns: ['createdAt', 'patientCondition.code'],
      filterableColumns: {
        createdAt: [FilterOperator.BTW, FilterOperator.LTE, FilterOperator.GTE],
        'patient.fullName': [FilterOperator.ILIKE],
        'histories.status.id': [FilterOperator.IN],
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(Encounter, {
      where: {
        id,
      },
      relations: {
        prescriptions: {
          items: {
            medication: true,
          },
        },
        diagnoses: {
          classificationDisease: true,
        },
        observation: {
          entries: true,
        },
        healthcareService: true,
        histories: {
          status: true,
        },
        patientCondition: true,
        participants: {
          user: true,
        },
      },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: EncounterInputRequest) {
    await this.entityManager.transaction(async (trx) => {
      const patient = await trx.findOneByOrFail(Patient, {
        id: data.patientId,
      });

      const patientCondition = await trx.findOneByOrFail(PatientCondition, {
        id: data.patientConditionId,
      });

      const healthcareService = await trx.findOneByOrFail(HealthcareService, {
        id: data.healthcareServiceId,
      });

      const paymentMethod = await trx.findOneByOrFail(PaymentMethod, {
        id: data.paymentMethodId,
      });

      const paymentStatus = await trx.findOneByOrFail(PaymentStatus, {
        code: 'pending',
      });

      const payment = trx.create(Payment, {
        amount: paymentMethod.code === 'paket-hemat' ? 75000 : 0,
        methodId: paymentMethod.id,
        statusId: paymentStatus.id,
      });
      await trx.save(payment);

      const encounter = trx.create(Encounter, {
        patient,
        healthcareService,
        periodStart: new Date(),
        patientCondition,
      });
      await trx.save(encounter);

      const encounterPayment = trx.create(EncounterPayment, {
        patientId: data.patientId,
        paymentId: payment.id,
        encounterId: encounter.id,
      });
      await trx.save(encounterPayment);

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
