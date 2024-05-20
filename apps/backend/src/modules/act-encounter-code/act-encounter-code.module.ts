import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActEncounterCode } from './act-encounter-code';
import { ActEncounterCodeController } from './act-encounter-code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActEncounterCode])],
  controllers: [ActEncounterCodeController],
})
export class ActEncounterModule {}
