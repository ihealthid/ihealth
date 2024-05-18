import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practitioner } from './practitioner';

@Module({
  imports: [TypeOrmModule.forFeature([Practitioner])],
  providers: [],
  controllers: [],
})
export class PractitionerModule {}
