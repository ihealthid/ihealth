import { IsString } from 'class-validator';

export class DonePaymentInputRequest {
  @IsString()
  id: string;
}
