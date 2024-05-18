import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationStock } from './medication-stock';
import { MedicationStockController } from './medication-stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationStock])],
  controllers: [MedicationStockController],
})
export class MedicationStockModule {}
