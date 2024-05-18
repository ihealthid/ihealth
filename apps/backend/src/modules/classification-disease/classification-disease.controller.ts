import {
  Controller,
  Get,
  ParseBoolPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { XMLParser } from 'fast-xml-parser';
import { ClassificationDiseaseService } from './classification-disease.service';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { ClassificationDisease } from './classification-disease';

@Controller({
  path: '/classification-diseases',
})
export class ClassificationDiseaseController {
  constructor(
    private service: ClassificationDiseaseService,
    @InjectRepository(ClassificationDisease)
    private diseaseRepository: Repository<ClassificationDisease>,
  ) {}

  @Post('/import/xml')
  @UseInterceptors(FileInterceptor('file'))
  async createXml(@UploadedFile('file') file: Express.Multer.File) {
    const parser = new XMLParser();
    const parsed = parser.parse(file.buffer);

    await this.service.create(parsed['ICD10CM.tabular']);
  }

  @Get()
  async paginate(
    @Pagination() { take, skip, filter, sort }: PaginationQuery,
    @Query('grouping', new ParseBoolPipe({ optional: true }))
    grouping?: boolean,
  ) {
    return this.diseaseRepository.findAndCount({
      take,
      skip,
      order: {
        ...sort,
        children: {
          display: 'ASC',
        },
      },
      where: {
        ...filter,
        children: {
          parentId: grouping ? Not(IsNull()) : IsNull(),
        },
      },
      relations: {
        children: true,
      },
    });
  }
}
