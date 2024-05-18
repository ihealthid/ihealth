import { IsNumber, IsString } from 'class-validator';

export class AllergyByEncounterCreateRequest {
  @IsNumber()
  encounterId: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;
}
