import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnose } from '../diagnose/diagnose';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnose])],
})
export class DiagnoseStatusModule {}
