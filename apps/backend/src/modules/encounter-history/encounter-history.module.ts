import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterHistory } from './encounter-history';

@Module({
  imports: [TypeOrmModule.forFeature([EncounterHistory])],
})
export class EncounterHistoryModule {}
