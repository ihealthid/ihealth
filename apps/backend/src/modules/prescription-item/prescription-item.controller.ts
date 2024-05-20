import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { PrescriptionItemRequest } from './prescription-item.request';
import { AuthGuard } from '../auth/auth.guard';
import { EntityManager } from 'typeorm';
import { PrescriptionItem } from './prescription-item';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Prescription } from '../prescription/prescription';
import { Medication } from '../medication/medication';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';

@Controller({
  path: 'prescription-items',
})
export class PrescriptionItemController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async paginateByPrescriptionId(
    @Pagination() paginationQuery: PaginationQuery,
  ) {
    return this.entityManager.findAndCount(PrescriptionItem, {
      ...paginationQuery,
      relations: {
        medication: true,
      },
    });
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async create(
    @Body()
    {
      id,
      encounterId,
      medicationId,
      quantity,
      note,
      frequency,
      doses,
    }: PrescriptionItemRequest,
  ) {
    if (!id && !encounterId) {
      throw new UnprocessableEntityException();
    }

    await this.entityManager.transaction(async (trx) => {
      const prescription = await trx.upsert(
        Prescription,
        {
          id: id ?? undefined,
          encounterId: encounterId ?? undefined,
        },
        ['id'],
      );

      const medication = await trx.findOneBy(Medication, { id: medicationId });
      if (!medication) {
        throw new NotFoundException('Medication not found');
      }

      const item = trx.create(PrescriptionItem, {
        quantity,
        note,
        frequency,
        doses,
        prescriptionId: prescription.generatedMaps[0].id,
        medicationId: medicationId,
        price: medication.price,
      });

      return trx.save(item);
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.entityManager.delete(PrescriptionItem, {
      id,
    });
  }
}
