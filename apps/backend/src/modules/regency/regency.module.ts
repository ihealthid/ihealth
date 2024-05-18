import { Module } from '@nestjs/common';
import { RegencyController } from './regency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regency } from './regency';

@Module({
  imports: [TypeOrmModule.forFeature([Regency])],
  controllers: [RegencyController],
})
export class RegencyModule {}
