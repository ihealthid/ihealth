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
import { District } from './district';
import { FindOptionsWhere, Repository } from 'typeorm';

@Controller({
  path: 'districts',
})
export class DistrictController {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  @Get()
  async paginate(
    @Pagination() { take, skip, filter, sort }: PaginationQuery,
    @Query('regencyId') regencyId?: string,
  ) {
    const where: FindOptionsWhere<District> = filter;

    if (regencyId) {
      where.regencyId = regencyId;
    }

    return this.districtRepository.findAndCount({
      take,
      skip,
      where,
      order: sort,
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
      await this.districtRepository.upsert(
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
