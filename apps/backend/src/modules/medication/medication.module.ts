import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medication';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  providers: [MedicationService],
  controllers: [MedicationController],
})
export class MedicationModule {}
