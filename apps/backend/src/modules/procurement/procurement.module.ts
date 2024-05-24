import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurement } from './procurement';
import { ProcurementController } from './procurement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Procurement])],
  controllers: [ProcurementController],
})
export class ProcurementModule {}
