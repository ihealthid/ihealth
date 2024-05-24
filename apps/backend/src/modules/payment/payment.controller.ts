import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { EntityManager } from 'typeorm';
import { Payment } from './payment';
import { PaymentStatus } from '../payment-status/payment-status';
import { DonePaymentInputRequest } from './payment.request';
import { EncounterPayment } from '../encounter-payment/encounter-payment';

@Controller({
  path: '/payments',
})
export class PaymentController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.entityManager.findAndCount(EncounterPayment, {
      ...pagination,
      relations: {
        encounter: {
          patient: true,
        },
        payment: {
          method: true,
          status: true,
        },
      },
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const payment = await this.entityManager.findOneOrFail(EncounterPayment, {
      where: { id },
      relations: {
        encounter: {
          healthcareService: true,
          diagnoseEncounterActs: {
            consumable: true,
          },
          prescriptions: {
            items: {
              medication: true,
            },
          },
        },
        payment: true,
      },
    });

    let subtotal = payment.encounter.healthcareService.price;

    const paymentItems: Record<string, any>[] = [
      {
        name: 'Konsultasi ' + payment.encounter.healthcareService.name,
        subtotal: payment.encounter.healthcareService.price,
      },
    ];

    for (const prescription of payment.encounter.prescriptions) {
      for (const item of prescription.items) {
        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        paymentItems.push({
          name: item.medication.name + ' (' + item.quantity + ' pcs)',
          subtotal: itemTotal,
        });
      }
    }

    for (const acts of payment.encounter.diagnoseEncounterActs) {
      subtotal += acts.consumable.price * acts.quantity;
      paymentItems.push({
        name: acts.consumable.name,
        subtotal: acts.consumable.price * acts.quantity,
      });
    }

    return {
      paymentItems,
      subtotal,
      discount: 1000,
      total: subtotal - 1000,
    };
  }

  @Post()
  async pay(@Body() { id }: DonePaymentInputRequest) {
    const status = await this.entityManager.findOneByOrFail(PaymentStatus, {
      code: 'done',
    });
    await this.entityManager.update(
      Payment,
      {
        id,
      },
      {
        status,
      },
    );
  }
}
