import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationEntry } from './observation-entry';

@Module({
  imports: [TypeOrmModule.forFeature([ObservationEntry])],
})
export class ObservationEntryModule {}
