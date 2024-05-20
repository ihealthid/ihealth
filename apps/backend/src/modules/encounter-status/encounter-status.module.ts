import { Module } from '@nestjs/common';
import { EncounterStatusController } from './encounter-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterStatus } from './encounter-status';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EncounterStatus])],
  controllers: [EncounterStatusController],
})
export class EncounterStatusModule {}
