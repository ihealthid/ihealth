import { Module } from '@nestjs/common';
import { ClassificationDiseaseController } from './classification-disease.controller';
import { ClassificationDiseaseService } from './classification-disease.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationDisease } from './classification-disease';
import { ClassificationDiseaseGroup } from '../classification-disease-group/classification-disease-group';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassificationDisease,
      ClassificationDiseaseGroup,
    ]),
  ],
  providers: [ClassificationDiseaseService],
  controllers: [ClassificationDiseaseController],
})
export class ClassificationDiseaseModule {}
