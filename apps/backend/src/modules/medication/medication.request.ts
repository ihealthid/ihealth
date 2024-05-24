import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MedicationInputRequest {
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase().trim())
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  bpom?: string;

  @IsString()
  doseFormId: string;
}
