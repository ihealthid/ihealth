import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoseForm } from './dose-form';
import { DoseFormController } from './dose-form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoseForm])],
  controllers: [DoseFormController],
})
export class DoseFormModule {}
