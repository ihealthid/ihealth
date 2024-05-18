import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient';
import { Identify } from '../identify/identify';
import { Address } from '../address/address';
import { AddressEntry } from '../address-entry/address-entry';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Identify, Address, AddressEntry]),
  ],
  controllers: [PatientController],
})
export class PatientModule {}
