import { IsNumber, IsDateString, IsString } from 'class-validator';

export class MedicationStockInputRequest {
  @IsString()
  medicationId: string;

  @IsString()
  distributorId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  expiredAt: string;
}
