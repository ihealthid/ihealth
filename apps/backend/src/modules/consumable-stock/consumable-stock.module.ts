import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumableStock } from './consumable-stock';
import { ConsumableStockController } from './consumable-stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumableStock])],
  controllers: [ConsumableStockController],
})
export class ConsumableStockModule {}
