import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnoseStatus } from './diagnose-status';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnoseStatus])],
})
export class DiagnoseStatusModule {}
