import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class Packaging {
  @IsNumber()
  pcs: number;

  @IsNumber()
  @IsOptional()
  packs?: number;

  @IsNumber()
  @IsOptional()
  boxes?: number;

  @IsNumber()
  @IsOptional()
  cartons?: number;
}

export class ConsumableStockInput {
  @IsNumber()
  consumableId: number;

  @ValidateNested()
  packaging: Packaging;

  @IsNumber()
  @IsOptional()
  measurement?: number;

  @IsDateString()
  expiredAt: string;
}
