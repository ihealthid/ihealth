import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XMLParser } from 'fast-xml-parser';
import { ClassificationDiseaseService } from './classification-disease.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ClassificationDisease } from './classification-disease';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: '/classification-diseases',
})
export class ClassificationDiseaseController {
  constructor(
    private service: ClassificationDiseaseService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post('/import/xml')
  @UseInterceptors(FileInterceptor('file'))
  async createXml(@UploadedFile('file') file: Express.Multer.File) {
    const parser = new XMLParser();
    const parsed = parser.parse(file.buffer);

    await this.service.create(parsed['ICD10CM.tabular']);
  }

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(
      query,
      this.entityManager.getRepository(ClassificationDisease),
      {
        sortableColumns: ['display'],
        relations: {
          children: true,
        },
      },
    );
  }
}
