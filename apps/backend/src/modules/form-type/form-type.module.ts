import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormType } from './form-type';
import { FormTypeController } from './form-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormType])],
  controllers: [FormTypeController],
})
export class FormTypeModule {}
