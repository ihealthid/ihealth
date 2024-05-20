import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaritalStatus } from './marital-status';
import { MaritalStatusController } from './marital-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MaritalStatus])],
  controllers: [MaritalStatusController],
})
export class MaritalStatusModule {}
