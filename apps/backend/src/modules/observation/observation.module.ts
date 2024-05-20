import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './observation';
import { ObservationController } from './observation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Observation])],
  controllers: [ObservationController],
})
export class ObservationModule {}
