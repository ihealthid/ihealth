import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacture } from './manufacture';
import { ManufactureController } from './manufacture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacture])],
  controllers: [ManufactureController],
})
export class ManufactureModule {}
