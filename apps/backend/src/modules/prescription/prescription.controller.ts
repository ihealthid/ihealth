import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { EntityManager } from 'typeorm';
import { Prescription } from './prescription';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PrescriptionStatus } from '../prescription-status/prescription-status';

@Controller({
  path: 'prescriptions',
})
export class PrescriptionController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginatePrescriptions(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Prescription, {
      ...paginationQuery,
      relations: {
        encounter: {
          patient: true,
        },
        status: true,
      },
    });
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.entityManager.findOneOrFail(Prescription, {
      where: { id },
      relations: {
        encounter: {
          patient: true,
        },
        items: {
          medication: true,
        },
      },
    });
  }

  @Get('/encounter/:encounterId')
  async findByEncounterId(
    @Param('encounterId', ParseIntPipe) encounterId: number,
  ) {
    return await this.entityManager.findOne(Prescription, {
      where: {
        encounterId,
      },
      relations: {
        items: {
          medication: true,
        },
      },
    });
  }

  @Post('/done')
  async done(@Body() { id }: any) {
    const status = await this.entityManager.findOneByOrFail(
      PrescriptionStatus,
      {
        code: 'done',
      },
    );

    await this.entityManager.update(
      Prescription,
      {
        id,
      },
      {
        status,
      },
    );
  }
}
