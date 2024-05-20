import { Module } from '@nestjs/common';
import { EncounterController } from './encounter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encounter } from './encounter';

@Module({
  imports: [TypeOrmModule.forFeature([Encounter])],
  controllers: [EncounterController],
})
export class EncounterModule {}
