import { Module } from '@nestjs/common';
import { EncounterController } from './encounter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encounter } from './encounter';
import { Participant } from '../participant/participant';
import { ParticipantTypeCode } from '../participant-type-code/participant-type-code';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { Patient } from '../patient/patient';
import { ActEncounterCode } from '../act-encounter-code/act-encounter-code';
import { EncounterStatus } from '../encounter-status/encounter-status';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import { PatientCondition } from '../patient-condition/patient-condition';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encounter,
      Participant,
      ParticipantTypeCode,
      EncounterHistory,
      Patient,
      ActEncounterCode,
      EncounterStatus,
      HealthcareService,
      PatientCondition
    ]),
  ],
  controllers: [EncounterController],
})
export class EncounterModule {}
