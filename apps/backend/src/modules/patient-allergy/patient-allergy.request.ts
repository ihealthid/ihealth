import { IsNumber, IsString } from 'class-validator';

export class AllergyByEncounterCreateRequest {
  @IsString()
  encounterId: string;

  @IsString()
  name: string;

  @IsNumber()
  level: number;
}
