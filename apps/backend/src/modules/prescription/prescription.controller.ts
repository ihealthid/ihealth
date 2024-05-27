import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Prescription } from './prescription';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PrescriptionStatus } from '../prescription-status/prescription-status';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'prescriptions',
})
export class PrescriptionController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Prescription), {
      sortableColumns: ['createdAt'],
      relations: {
        encounter: {
          patient: true,
        },
        status: true,
      },
    });
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
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
  async findByEncounterId(@Param('encounterId') encounterId: string) {
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
