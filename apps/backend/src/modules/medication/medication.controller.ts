import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MedicationInputRequest } from './medication.request';
import * as dayjs from 'dayjs';
import { MedicationService } from './medication.service';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Medication } from './medication';
import { Between, EntityManager, LessThan, MoreThan } from 'typeorm';
import { MedicationStock } from '../medication-stock/medication-stock';

@Controller({
  path: 'medications',
})
export class MedicationController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private medicationService: MedicationService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Medication, paginationQuery);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.entityManager.findOneOrFail(Medication, { where: { id } });
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: MedicationInputRequest) {
    const medication = this.entityManager.create(Medication, data);
    return this.entityManager.save(medication);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<MedicationInputRequest>,
  ) {
    return await this.entityManager.update(Medication, { id }, data);
  }

  @Get('/:id/count')
  @UseGuards(AuthGuard)
  async stockCounter(@Param('id', ParseIntPipe) id: number) {
    const allStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        expiredAt: MoreThan(dayjs().subtract(1, 'year').toDate()),
      },
    });

    const goodStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        expiredAt: MoreThan(dayjs().add(3, 'months').toDate()),
      },
    });

    const beforeExpiresStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        expiredAt: Between(dayjs().add(3, 'months').toDate(), new Date()),
      },
    });

    const expiredQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        expiredAt: LessThan(new Date()),
      },
    });

    const [allStock, goodStock, beforeExpiresStock, expiredStock] =
      await Promise.all([
        allStockQuery,
        goodStockQuery,
        beforeExpiresStockQuery,
        expiredQuery,
      ]);

    const data = {
      all: this.medicationService.countStock(allStock),
      good: this.medicationService.countStock(goodStock),
      beforeExpires: this.medicationService.countStock(beforeExpiresStock),
      expired: this.medicationService.countStock(expiredStock),
    };

    return data;
  }
}
