import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distributor } from './distributor';
import { DistributorController } from './distributor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  controllers: [DistributorController],
})
export class DistributorModule {}
