import { IsOptional, IsString } from 'class-validator';

export class DiagnoseEncounterActInputRequest {
  @IsString()
  encounterId: string;

  @IsString()
  userId: string;

  @IsString()
  encounterActId: string;

  @IsString()
  @IsOptional()
  consumableId?: string;
}
