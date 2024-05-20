import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationDiseaseGroup } from './classification-disease-group';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificationDiseaseGroup])],
})
export class ClassificationDiseaseGroupModule {}
