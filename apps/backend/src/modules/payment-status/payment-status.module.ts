import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './payment-status';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
})
export class PaymentStatusModule {}
