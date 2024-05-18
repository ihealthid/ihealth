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
import { Village } from './village';
import { FindOptionsWhere, Repository } from 'typeorm';

@Controller({
  path: 'villages',
})
export class VillageController {
  constructor(
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,
  ) {}

  @Get()
  async paginate(
    @Pagination() { take, skip, sort, filter }: PaginationQuery,
    @Query('districtId') districtId?: string,
  ) {
    const where: FindOptionsWhere<Village> = filter;

    if (districtId) {
      where.districtId = districtId;
    }

    return this.villageRepository.findAndCount({
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

    for (const [id, districtId, name] of records) {
      await this.villageRepository.upsert(
        {
          id,
          name,
          districtId,
        },
        {
          conflictPaths: ['id'],
        },
      );
    }
  }
}
