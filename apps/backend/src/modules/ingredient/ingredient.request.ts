import { IsString } from 'class-validator';

export class IngredientInputRequest {
  @IsString()
  name: string;
}
