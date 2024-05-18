import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConsumableCreateRequest {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isImported: boolean;

  @IsString()
  @IsOptional()
  variant?: string;

  @IsNumber()
  formTypeId: number;

  @IsNumber()
  brandId: number;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsString()
  @IsOptional()
  registeredId?: string;
}
