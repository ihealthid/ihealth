import { IsNumber, IsDateString } from 'class-validator';

export class MedicationStockInputRequest {
  @IsNumber()
  medicationId: number;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  expiredAt: string;
}
