import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterPayment } from './encounter-payment';

@Module({
  imports: [TypeOrmModule.forFeature([EncounterPayment])],
})
export class EncounterPaymentModule {}
