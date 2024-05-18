import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './district';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictController],
})
export class DistrictModule {}
