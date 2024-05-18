import { Module } from '@nestjs/common';
import { ConsumableController } from './consumable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumable } from './consumable';

@Module({
  imports: [TypeOrmModule.forFeature([Consumable])],
  controllers: [ConsumableController],
})
export class ConsumableModule {}
