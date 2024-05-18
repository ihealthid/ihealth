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
import { ParticipantTypeCode } from './participant-type-code';

@Controller({
  path: 'participant-type-codes',
})
export class ParticipantTypeCodeController {
  constructor(
    @InjectRepository(ParticipantTypeCode)
    private participantTypeCode: Repository<ParticipantTypeCode>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.participantTypeCode.findAndCount({
      take,
      skip,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.participantTypeCode.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const participantTypeCode = this.participantTypeCode.create(data);
    return this.participantTypeCode.save(participantTypeCode);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const participantTypeCode = await this.participantTypeCode.findOneByOrFail({
      id,
    });
    const uData = this.participantTypeCode.merge(participantTypeCode, data);
    return this.participantTypeCode.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const participantTypeCode = await this.participantTypeCode.findOneByOrFail({
      id,
    });
    await this.participantTypeCode.remove(participantTypeCode);
    return participantTypeCode;
  }
}
