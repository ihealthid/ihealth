import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeSystem } from './code-system';
import { CodeSystemController } from './code-system.controller';
import { CodeSystemProperty } from '../code-system-property/code-system-property';
import { Coding } from '../coding/coding';
import { CodeSystemType } from '../code-system-type/code-system-type';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CodeSystem,
      CodeSystemProperty,
      Coding,
      CodeSystemType,
    ]),
  ],
  controllers: [CodeSystemController],
})
export class CodeSystemModule {}
