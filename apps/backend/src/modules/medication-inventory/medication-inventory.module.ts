import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationInventory } from './medication-inventory';
import { MedicationInventoryController } from './medication-inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationInventory])],
  controllers: [MedicationInventoryController],
})
export class MedicationInventoryModule {}
