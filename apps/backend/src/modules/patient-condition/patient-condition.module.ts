import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientCondition } from './patient-condition';
import { PatientConditionController } from './patient-condition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientCondition])],
  controllers: [PatientConditionController],
})
export class PatientConditionModule {}
