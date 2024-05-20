import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeSystemProperty } from './code-system-property';

@Module({
  imports: [TypeOrmModule.forFeature([CodeSystemProperty])],
})
export class CodeSystemPropertyModule {}
