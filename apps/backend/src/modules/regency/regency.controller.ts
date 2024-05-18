import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parse';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Regency } from './regency';
import { FindOptionsWhere, Repository } from 'typeorm';

@Controller({
  path: 'regencies',
})
export class RegencyController {
  constructor(
    @InjectRepository(Regency)
    private regencyRepository: Repository<Regency>,
  ) {}

  @Get()
  async pagination(
    @Pagination() { take, skip }: PaginationQuery,
    @Query('provinceId')
    provinceId?: string,
  ) {
    const where: FindOptionsWhere<Regency> = {};

    if (provinceId) {
      where.provinceId = provinceId;
    }

    return this.regencyRepository.findAndCount({
      skip,
      take,
      where,
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
      await this.regencyRepository.upsert(
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
