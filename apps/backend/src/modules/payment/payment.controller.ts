import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Payment } from './payment';
import { PaymentStatus } from '../payment-status/payment-status';
import { DonePaymentInputRequest } from './payment.request';
import { EncounterPayment } from '../encounter-payment/encounter-payment';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DiagnoseEncounterAct } from '../diagnose-encounter-act/diagnose-encounter-act';
import { PaymentMethd } from '../payment-method/payment-method';
import { Encounter } from '../encounter/encounter';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import { Prescription } from '../prescription/prescription';
import { PaymentService } from './payment.service';
import { MedicationStock } from '../medication-stock/medication-stock';
import { Medication } from '../medication/medication';

@Controller({
  path: '/payments',
})
export class PaymentController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private paymentService: PaymentService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Payment), {
      sortableColumns: ['createdAt'],
      filterableColumns: {
        createdAt: [FilterOperator.BTW],
        'status.order': [FilterOperator.GT, FilterOperator.LT],
      },
      relations: {
        encounterPayment: {
          encounter: {
            patient: true,
          },
        },
        method: true,
        status: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    const payment = await this.entityManager.findOneOrFail(Payment, {
      where: {
        id,
      },
    });

    const encounterPayment = await this.entityManager.findOneByOrFail(
      EncounterPayment,
      {
        paymentId: payment.id,
      },
    );

    const encounter = await this.entityManager.findOneByOrFail(Encounter, {
      id: encounterPayment.encounterId,
    });

    const healthcareService = await this.entityManager.findOneByOrFail(
      HealthcareService,
      {
        id: encounter.healthcareServiceId,
      },
    );

    const diagnoseEncounterActs = await this.entityManager.find(
      DiagnoseEncounterAct,
      {
        where: {
          encounterId: encounter.id,
        },
      },
    );

    let subtotal = healthcareService.price;

    const paymentItems: Record<string, any>[] = [
      {
        name: healthcareService.name,
        subtotal: healthcareService.price,
      },
    ];

    const prescriptions = await this.entityManager.find(Prescription, {
      where: {
        encounter: {
          id: encounter.id,
        },
      },
      relations: {
        items: {
          medication: true,
        },
      },
    });

    for (const prescription of prescriptions) {
      for (const item of prescription.items) {
        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        paymentItems.push({
          name: item.medication.name + ' (' + item.quantity + ' pcs)',
          subtotal: itemTotal,
        });
      }
    }

    // for (const act of diagnoseEncounterActs) {
    //   subtotal += act.consumable * act.quantity;
    //   paymentItems.push({
    //     name: act.consumable.name,
    //     subtotal: act.consumable.price * act.quantity,
    //   });
    // }

    return {
      paymentItems,
      subtotal,
      discount: 0,
      total: subtotal - 0,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async pay(@Body() { id }: DonePaymentInputRequest) {
    await this.entityManager.transaction(async (trx) => {
      const status = await trx.findOneByOrFail(PaymentStatus, {
        code: 'done',
      });

      const method = await trx.findOneByOrFail(PaymentMethd, {
        code: 'cash',
      });

      const payment = await trx.findOneOrFail(Payment, {
        where: {
          id,
        },
        relations: {
          encounterPayment: {
            encounter: {
              prescriptions: {
                items: {
                  medication: true,
                },
              },
            },
          },
        },
      });

      await trx.update(
        Payment,
        {
          id,
        },
        {
          status,
          method,
        },
      );

      for (const { items } of payment.encounterPayment.encounter
        .prescriptions) {
        for (const item of items) {
          await trx.insert(MedicationStock, {
            medicationId: item.medicationId,
            quantity: -item.quantity,
            balance: item.medication.stock - item.quantity,
            price: item.medication.price,
          });

          await trx.update(Medication, item.medication, {
            stock: item.medication.stock - item.quantity,
          });
        }
      }
    });
  }
}
