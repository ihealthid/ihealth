import {
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Address {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  rt?: string;

  @IsString()
  @IsOptional()
  rw?: string;

  @IsString()
  @IsOptional()
  no?: string;

  @IsString()
  @IsOptional()
  block?: string;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsString()
  villageId: string;
}

export class PatientCreateRequest {
  @IsString()
  @IsOptional()
  nik?: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  religion?: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Address)
  address!: Address;
}
