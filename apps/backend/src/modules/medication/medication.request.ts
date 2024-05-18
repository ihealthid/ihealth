import { IsNumber, IsString } from 'class-validator';

export class MedicationInputRequest {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  bpom: string;

  @IsNumber()
  doseFormId: number;
}
