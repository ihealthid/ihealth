import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class PrescriptionItem {
  @IsString()
  medicationId: string;

  @IsNumber()
  quantity: number;
}

export class PrescriptionCreateRequest {
  @IsString()
  encounterId?: string;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  item: PrescriptionItem;
}
