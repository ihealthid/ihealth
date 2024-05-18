import { IsNumber } from 'class-validator';

export class EncounterInputRequest {
  @IsNumber()
  patientId: number;

  @IsNumber()
  healthcareServiceId: number;

  @IsNumber()
  patientConditionId: number;
}
