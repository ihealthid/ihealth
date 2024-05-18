import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identify } from './identify';

@Module({
  imports: [TypeOrmModule.forFeature([Identify])],
  providers: [],
  controllers: [],
})
export class IdentifyModule {}
