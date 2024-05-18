import { Module } from '@nestjs/common';
import { DiagnoseController } from './diagnose.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnose } from './diagnose';
import { Participant } from '../participant/participant';
import { ClassificationDisease } from '../classification-disease/classification-disease';
import { DiagnoseStatus } from '../diagnose-status/diagnose-status';
import { EncounterStatus } from '../encounter-status/encounter-status';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diagnose,
      Participant,
      ClassificationDisease,
      DiagnoseStatus,
      EncounterStatus,
    ]),
  ],
  controllers: [DiagnoseController],
})
export class DiagnoseModule {}
