import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
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
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(
      ParticipantTypeCode,
      paginationQuery,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(ParticipantTypeCode, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const participantTypeCode = this.entityManager.create(
      ParticipantTypeCode,
      data,
    );
    return this.entityManager.save(participantTypeCode);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const participantTypeCode = await this.entityManager.findOneByOrFail(
      ParticipantTypeCode,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      ParticipantTypeCode,
      participantTypeCode,
      data,
    );
    return this.entityManager.save(ParticipantTypeCode, uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const participantTypeCode = await this.entityManager.findOneByOrFail(
      ParticipantTypeCode,
      {
        id,
      },
    );
    await this.entityManager.remove(participantTypeCode);
    return participantTypeCode;
  }
}
