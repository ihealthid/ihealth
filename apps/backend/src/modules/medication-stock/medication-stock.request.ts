import { IsNumber, IsDateString, IsString } from 'class-validator';

export class MedicationStockInputRequest {
  @IsString()
  medicationId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  expiredAt: string;
}
