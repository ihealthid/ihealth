import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientAllergy } from './patient-allergy';
import { Patient } from '../patient/patient';
import { Allergy } from '../allergy/allergy';
import { PatientAllergyController } from './patient-allergy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientAllergy, Patient, Allergy])],
  controllers: [PatientAllergyController],
})
export class PatientAllergyModule {}
