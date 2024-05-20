import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PrescriptionItemRequest {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  encounterId?: string;

  @IsString()
  medicationId: string;

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
