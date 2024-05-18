import {
  Controller,
  Get,
  Post,
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
import { Province } from './province';
import {  Repository } from 'typeorm';

@Controller({
  path: 'provinces',
})
export class ProvinceController {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  @Get()
  async paginate(@Pagination() { take, skip, sort, filter }: PaginationQuery) {
    return this.provinceRepository.findAndCount({
      skip,
      take,
      order: sort,
      where: filter,
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
      await this.provinceRepository.upsert(
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
