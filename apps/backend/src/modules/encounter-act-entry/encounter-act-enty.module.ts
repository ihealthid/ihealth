import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterActEntry } from './encounter-act-entry';

@Module({
  imports: [TypeOrmModule.forFeature([EncounterActEntry])],
})
export class EncounterActEntryModule {}
