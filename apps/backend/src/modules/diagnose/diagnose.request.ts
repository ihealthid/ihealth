import { IsOptional, IsString } from 'class-validator';

export class DiagnoseUpsertRequest {
  @IsString()
  encounterId: string;

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

  @IsString()
  @IsOptional()
  classificationDiseaseId?: string;
}
