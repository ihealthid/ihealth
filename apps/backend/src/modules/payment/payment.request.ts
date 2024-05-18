import { IsNumber } from 'class-validator';

export class DonePaymentInputRequest {
  @IsNumber()
  id: number;
}
