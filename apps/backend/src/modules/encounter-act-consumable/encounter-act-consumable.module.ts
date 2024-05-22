import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterActConsumable } from './encounter-act-consumable';
import { EncounterActConsumableController } from './encounter-act-consumable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EncounterActConsumable])],
  controllers: [EncounterActConsumableController],
})
export class EncounterActConsumableModule {}
