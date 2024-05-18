import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
})
export class ParticipantModule {}
