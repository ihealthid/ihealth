import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantTypeCode } from './participant-type-code';
import { ParticipantTypeCodeController } from './participant-type-code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantTypeCode])],
  providers: [],
  controllers: [ParticipantTypeCodeController],
})
export class ParticipantTypeCodeModule {}
