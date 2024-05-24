import { IsNumber, IsString } from 'class-validator';

export class MedicationIngredientInputRequest {
  @IsString()
  medicationId: string;

  @IsString()
  ingredientId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: string;
}
