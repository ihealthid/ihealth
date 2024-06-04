import { IsString } from 'class-validator';

export class PaymentMethodInput {
  @IsString()
  code: string;

  @IsString()
  display: string;
}
