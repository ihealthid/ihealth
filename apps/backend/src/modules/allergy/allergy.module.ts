import { Module } from '@nestjs/common';
import { AllergyController } from './allergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy])],
  controllers: [AllergyController],
})
export class AllergyModule {}
