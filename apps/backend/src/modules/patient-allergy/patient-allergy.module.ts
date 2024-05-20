import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientAllergy } from './patient-allergy';
import { PatientAllergyController } from './patient-allergy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientAllergy])],
  controllers: [PatientAllergyController],
})
export class PatientAllergyModule {}
