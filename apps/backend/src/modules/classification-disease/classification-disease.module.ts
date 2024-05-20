import { Module } from '@nestjs/common';
import { ClassificationDiseaseController } from './classification-disease.controller';
import { ClassificationDiseaseService } from './classification-disease.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationDisease } from './classification-disease';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificationDisease])],
  providers: [ClassificationDiseaseService],
  controllers: [ClassificationDiseaseController],
})
export class ClassificationDiseaseModule {}
