import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './observation';
import { ObservationController } from './observation.controller';
import { ObservationEntry } from '../observation-entry/observation-entry';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { EncounterStatus } from '../encounter-status/encounter-status';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Observation,
      ObservationEntry,
      EncounterHistory,
      EncounterStatus,
    ]),
  ],
  controllers: [ObservationController],
})
export class ObservationModule {}
