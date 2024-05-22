import { IsNumber, IsString } from 'class-validator';

export class EncounterActConsumableInputRequest {
  @IsString()
  encounterActId: string;

  @IsString()
  consumableId: string;

  @IsNumber()
  quantity: string;
}
