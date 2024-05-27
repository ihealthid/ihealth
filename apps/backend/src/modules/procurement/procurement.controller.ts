import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Procurement } from './procurement';
import { ProcurementInputRequest } from './procurement.request';
import { MedicationStock } from '../medication-stock/medication-stock';
import { Payment } from '../payment/payment';
import { PaymentStatus } from '../payment-status/payment-status';
import { PaymentMethd } from '../payment-method/payment-method';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'procurements',
})
export class ProcurementController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Procurement), {
      sortableColumns: ['createdAt'],
    });
  }

  @Post()
  async create(
    @Body() { distributorId, items, isCredit }: ProcurementInputRequest,
  ) {
    await this.entityManager.transaction(async (trx) => {
      const procurement = trx.create(Procurement, {
        distributorId,
      });

      await trx.save(procurement);

      let amount = 0;
      for (const item of items) {
        let balance = 0;

        const stock = await trx.findOneBy(MedicationStock, {
          medicationId: item.medicationId,
        });

        if (stock) {
          balance += stock.balance;
        }

        const discount = item.quantity * item.price;
        amount += item.quantity * item.price - discount;

        const newStock = trx.create(MedicationStock, {
          medicationId: item.medicationId,
          quantity: item.quantity,
          expiredAt: item.expiredAt,
          price: item.price,
          discount: item.discount,
          balance,
        });
        await trx.save(newStock);
      }

      const paymentMethod = await trx.findOneByOrFail(PaymentMethd, {
        code: isCredit ? 'credit' : 'cash',
      });
      const paymentStatus = await trx.findOneByOrFail(PaymentStatus, {
        code: isCredit ? 'pending' : 'done',
      });

      const payment = trx.create(Payment, {
        amount: -amount,
        status: paymentStatus,
        method: paymentMethod,
      });
      await trx.save(payment);
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const procurement = await this.entityManager.findOneByOrFail(Procurement, {
      id,
    });
    return this.entityManager.remove(procurement);
  }
}
