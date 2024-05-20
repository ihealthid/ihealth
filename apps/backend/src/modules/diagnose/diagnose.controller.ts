import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DiagnoseUpsertRequest } from './diagnose.request';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { EntityManager } from 'typeorm';
import { Diagnose } from './diagnose';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Participant } from '../participant/participant';
import { ClassificationDisease } from '../classification-disease/classification-disease';
import { Prescription } from '../prescription/prescription';
import { PrescriptionStatus } from '../prescription-status/prescription-status';
import { EncounterStatus } from '../encounter-status/encounter-status';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { DiagnoseStatus } from '../diagnose-status/diagnose-status';
import { Payment } from '../payment/payment';
import { PaymentStatus } from '../payment-status/payment-status';

@Controller({
  path: 'diagnoses',
})
export class DiagnoseController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get('/encounter/:encounterId')
  @UseGuards(AuthGuard)
  async findByEncounterId(@Param('encounterId') encounterId: string) {
    return await this.entityManager.findOne(Diagnose, {
      where: {
        encounterId,
      },
      relations: {
        classificationDisease: true,
      },
    });
  }

  @Put()
  @UseGuards(AuthGuard)
  async upsert(
    @Request() { user },
    @Body()
    { encounterId, classificationDiseaseId, ...data }: DiagnoseUpsertRequest,
  ) {
    await this.entityManager.transaction(async (trx) => {
      let diagnose = await trx.findOne(Diagnose, {
        where: {
          encounterId,
        },
      });

      if (!diagnose) {
        diagnose = trx.create(Diagnose, {
          encounterId,
        });
      }

      for (const [key, value] of Object.entries(data)) {
        diagnose[key] = value;
      }

      await trx.save(diagnose);

      const participant = await trx.findOne(Participant, {
        where: {
          userId: user.sub,
        },
      });

      if (!participant) {
        const created = trx.create(Participant, {
          userId: user.sub,
          encounterId,
        });
        await trx.save(created);
      }

      if (classificationDiseaseId) {
        const classificationDisease = await trx.findOneBy(
          ClassificationDisease,
          {
            id: classificationDiseaseId,
          },
        );
        if (classificationDisease) {
          diagnose.classificationDisease = classificationDisease;
        }
        await trx.save(diagnose);
      }
    });
  }

  @Post('/encounter/:encounterId')
  @UseGuards(AuthGuard)
  async finish(@Param('encounterId') encounterId: string) {
    return await this.entityManager.transaction(async (trx) => {
      const prescriptionStatus = await trx.findOneBy(PrescriptionStatus, {
        code: 'request',
      });

      await trx.update(
        Prescription,
        {
          encounterId,
        },
        {
          status: prescriptionStatus,
        },
      );

      const encounterStatus = await trx.findOneBy(EncounterStatus, {
        code: 'done',
      });

      await trx.insert(EncounterHistory, {
        encounterId,
        status: encounterStatus,
      });

      const paymentStatus = await trx.findOneBy(PaymentStatus, {
        code: 'pending',
      });

      const payment = trx.create(Payment, {
        amount: 1234,
        encounterId,
        status: paymentStatus,
      });
      trx.save(payment);

      const diagnoseStatus = await trx.findOneBy(DiagnoseStatus, {
        code: 'done',
      });

      return trx.update(
        Diagnose,
        {
          encounterId,
        },
        {
          status: diagnoseStatus,
        },
      );
    });
  }
}
