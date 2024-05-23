import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class MedicationItem {
  @IsString()
  medicationId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsDateString()
  expiredAt: string;
}

export class ProcurementInputRequest {
  @IsString()
  @IsOptional()
  distributorId?: string;

  @IsBoolean()
  @IsOptional()
  isCredit?: boolean;

  @ValidateNested({
    each: true,
  })
  items: MedicationItem[];
}
