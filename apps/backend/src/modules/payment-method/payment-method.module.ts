import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethd } from './payment-method';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethd])],
})
export class PaymentMethodModule {}
