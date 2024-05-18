import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionStatus } from './prescription-status';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionStatus])],
})
export class PrescriptionStatusModule {}
