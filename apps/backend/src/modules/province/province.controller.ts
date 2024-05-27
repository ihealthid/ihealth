import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parse';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Province } from './province';
import { EntityManager } from 'typeorm';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

@Controller({
  path: 'provinces',
})
export class ProvinceController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Province), {
      sortableColumns: ['name'],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    const records = await new Promise<any[]>((resolve) => {
      csv.parse(
        file.buffer,
        {
          from: 1,
        },
        (err, records) => {
          resolve(records);
        },
      );
    });

    for (const [id, name] of records) {
      await this.entityManager.upsert(
        Province,
        {
          id,
          name,
        },
        {
          conflictPaths: ['id'],
        },
      );
    }
  }
}
