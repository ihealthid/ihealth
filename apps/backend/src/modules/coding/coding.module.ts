import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coding } from './coding';

@Module({
  imports: [TypeOrmModule.forFeature([Coding])],
})
export class CodingModule {}
