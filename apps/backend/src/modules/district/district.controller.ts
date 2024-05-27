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
import { District } from './district';
import { EntityManager } from 'typeorm';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

@Controller({
  path: 'districts',
})
export class DistrictController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(District), {
      sortableColumns: ['name'],
      filterableColumns: {
        regencyId: [FilterOperator.EQ],
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

    for (const [id, regencyId, name] of records) {
      await this.entityManager.upsert(
        District,
        {
          id,
          name,
          regencyId,
        },
        {
          conflictPaths: ['id'],
        },
      );
    }
  }
}
