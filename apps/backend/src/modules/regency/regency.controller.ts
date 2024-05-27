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
import { Regency } from './regency';
import { EntityManager } from 'typeorm';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

@Controller({
  path: 'regencies',
})
export class RegencyController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Regency), {
      sortableColumns: ['name'],
      filterableColumns: {
        provinceId: [FilterOperator.EQ],
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

    for (const [id, provinceId, name] of records) {
      await this.entityManager.upsert(
        Regency,
        {
          id,
          name,
          provinceId,
        },
        {
          conflictPaths: ['id'],
        },
      );
    }
  }
}
