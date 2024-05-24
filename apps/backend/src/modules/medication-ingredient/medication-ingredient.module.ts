import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationIngredient } from './medication-ingredient';
import { MedicationIngredientController } from './medication-ingredient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationIngredient])],
  controllers: [MedicationIngredientController],
})
export class MedicationIngredientModule {}
