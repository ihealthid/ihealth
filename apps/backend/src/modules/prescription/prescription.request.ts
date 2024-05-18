import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';

class PrescriptionItem {
  @IsNumber()
  medicationId: number;

  @IsNumber()
  quantity: number;
}

export class PrescriptionCreateRequest {
  @IsNumber()
  encounterId?: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  item: PrescriptionItem;
}
