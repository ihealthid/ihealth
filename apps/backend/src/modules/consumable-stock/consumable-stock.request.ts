import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
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
  @IsString()
  consumableId: string;

  @ValidateNested()
  packaging: Packaging;

  @IsNumber()
  @IsOptional()
  measurement?: number;

  @IsDateString()
  expiredAt: string;
}
