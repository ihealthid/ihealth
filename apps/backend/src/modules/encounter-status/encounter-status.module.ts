import { Module } from '@nestjs/common';
import { EncounterStatusController } from './encounter-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterStatus } from './encounter-status';
import { CqrsModule } from '@nestjs/cqrs';
import { FindEncounterStatusByIdHandler } from './handlers/find-encounter-status-by-id.handler';
import { FindEncounterStatusByCodeHandler } from './handlers/find-encounter-status-by-code.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EncounterStatus])],
  providers: [FindEncounterStatusByIdHandler, FindEncounterStatusByCodeHandler],
  controllers: [EncounterStatusController],
  exports: [FindEncounterStatusByIdHandler, FindEncounterStatusByCodeHandler],
})
export class EncounterStatusModule {}
