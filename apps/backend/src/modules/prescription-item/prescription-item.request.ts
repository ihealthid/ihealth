import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PrescriptionItemRequest {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  encounterId?: number;

  @IsNumber()
  medicationId: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum(['daily', 'week', 'month'])
  frequency: string;

  @IsNumber()
  doses: number;
}
