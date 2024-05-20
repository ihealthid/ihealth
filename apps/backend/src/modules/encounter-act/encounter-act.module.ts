import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterAct } from './encounter-act';
import { EncounterActController } from './encounter-act.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EncounterAct])],
  controllers: [EncounterActController],
})
export class EncounterActModule {}
