import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { ActEncounterCode } from './act-encounter-code';

@Controller({
  path: 'act-encounter-codes',
})
export class ActEncounterCodeController {
  constructor(
    @InjectRepository(ActEncounterCode)
    private actEncounterCodeRepository: Repository<ActEncounterCode>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.actEncounterCodeRepository.findAndCount({
      take,
      skip,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.actEncounterCodeRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const actEncounterCode = this.actEncounterCodeRepository.create(data);
    return this.actEncounterCodeRepository.save(actEncounterCode);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const actEncounterCode =
      await this.actEncounterCodeRepository.findOneByOrFail({
        id,
      });
    const uData = this.actEncounterCodeRepository.merge(actEncounterCode, data);
    return this.actEncounterCodeRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const actEncounterCode =
      await this.actEncounterCodeRepository.findOneByOrFail({
        id,
      });
    await this.actEncounterCodeRepository.remove(actEncounterCode);
    return actEncounterCode;
  }
}
