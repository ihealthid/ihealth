import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
})
export class PatientModule {}
