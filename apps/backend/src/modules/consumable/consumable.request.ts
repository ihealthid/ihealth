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

  @IsString()
  formTypeId: string;

  @IsString()
  brandId: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsString()
  @IsOptional()
  registeredId?: string;
}
