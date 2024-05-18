import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DiagnoseUpsertRequest {
  @IsNumber()
  encounterId: number;

  @IsString()
  @IsOptional()
  subjective?: string;

  @IsString()
  @IsOptional()
  objective?: string;

  @IsString()
  @IsOptional()
  assessment?: string;

  @IsString()
  @IsOptional()
  plan?: string;

  @IsNumber()
  @IsOptional()
  classificationDiseaseId?: number;
}
