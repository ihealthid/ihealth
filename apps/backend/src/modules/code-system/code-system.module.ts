import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeSystem } from './code-system';
import { CodeSystemController } from './code-system.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CodeSystem])],
  controllers: [CodeSystemController],
})
export class CodeSystemModule {}
