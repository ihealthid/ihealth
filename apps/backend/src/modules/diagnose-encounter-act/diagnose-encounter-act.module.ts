import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnoseEncounterAct } from './diagnose-encounter-act';
import { DiagnoseEncounterActController } from './diagnose-encounter-act.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnoseEncounterAct])],
  controllers: [DiagnoseEncounterActController],
})
export class DiagnoseEncounterActModule {}
