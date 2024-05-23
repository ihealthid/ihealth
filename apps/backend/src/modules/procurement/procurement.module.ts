import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurement } from './procurement';

@Module({
  imports: [TypeOrmModule.forFeature([Procurement])],
})
export class ProcurementModule {}
