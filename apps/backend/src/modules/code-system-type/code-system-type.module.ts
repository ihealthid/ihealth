import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeSystemType } from './code-system-type';
import { CodeSystemTypeController } from './code-system-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CodeSystemType])],
  controllers: [CodeSystemTypeController],
})
export class CodeSystemTypeModule {}
