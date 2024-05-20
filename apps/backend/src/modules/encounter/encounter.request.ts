import { IsString } from 'class-validator';

export class EncounterInputRequest {
  @IsString()
  patientId: string;

  @IsString()
  healthcareServiceId: string;

  @IsString()
  patientConditionId: string;
}
