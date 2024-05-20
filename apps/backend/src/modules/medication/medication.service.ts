import { Injectable } from '@nestjs/common';
import { MedicationStock } from '../medication-stock/medication-stock';

@Injectable()
export class MedicationService {
  countStock(data: MedicationStock[]) {
    let total = 0;
    data.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }
}
