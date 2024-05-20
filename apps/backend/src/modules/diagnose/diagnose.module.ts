import { Module } from '@nestjs/common';
import { DiagnoseController } from './diagnose.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnose } from './diagnose';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnose])],
  controllers: [DiagnoseController],
})
export class DiagnoseModule {}
