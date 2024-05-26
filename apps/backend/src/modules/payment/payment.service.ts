import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Prescription } from '../prescription/prescription';
import { Medication } from '../medication/medication';
import { MedicationStock } from '../medication-stock/medication-stock';

@Injectable()
export class PaymentService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async calculatePrescription(trx: EntityManager, encounterId: string) {
    let total = 0;
    const items = [];

    const prescriptions = await trx.find(Prescription, {
      where: {
        encounterId,
      },
      relations: {
        items: {
          medication: true,
        },
      },
    });

    for (const prescription of prescriptions) {
      for (const item of prescription.items) {
        await this.reduceMedicationStock(trx, item.medication, item.quantity);

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        items.push({
          name: item.medication.name + ' (' + item.quantity + ' pcs)',
          subtotal: itemTotal,
        });
      }
    }

    return { total, items };
  }

  private async reduceMedicationStock(
    trx: EntityManager,
    medication: Medication,
    quantity: number,
  ) {
    await trx.update(Medication, medication, {
      stock: medication.stock - quantity,
    });

    const stock = await trx.findOne(MedicationStock, {
      where: {
        medicationId: medication.id,
      },
      order: {
        createdAt: 'desc',
      },
    });

    await trx.insert(MedicationStock, {
      medicationId: medication.id,
      quantity: -quantity,
      balance: stock.balance - quantity,
    });
  }
}
