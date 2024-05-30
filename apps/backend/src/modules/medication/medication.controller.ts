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
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

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
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Medication), {
      sortableColumns: ['name', 'doseForm.display'],
      nullSort: 'last',
      defaultSortBy: [['name', 'ASC']],
      searchableColumns: ['name', 'ingredients.ingredient.name'],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
        stock: [FilterOperator.GT],
        'ingredients.ingredient.name': [FilterOperator.ILIKE],
      },
      relations: {
        ingredients: {
          ingredient: true,
        },
        doseForm: true,
        stocks: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string) {
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
    @Param('id') id: string,
    @Body() data: Partial<MedicationInputRequest>,
  ) {
    return await this.entityManager.update(Medication, { id }, data);
  }

  @Get('/:id/count')
  @UseGuards(AuthGuard)
  async stockCounter(@Param('id') id: string) {
    const allStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        // expiredAt: MoreThan(dayjs().subtract(1, 'year').toDate()),
      },
    });

    const goodStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        // expiredAt: MoreThan(dayjs().add(3, 'months').toDate()),
      },
    });

    const beforeExpiresStockQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        // expiredAt: Between(dayjs().add(3, 'months').toDate(), new Date()),
      },
    });

    const expiredQuery = this.entityManager.find(MedicationStock, {
      where: {
        medicationId: id,
        // expiredAt: LessThan(new Date()),
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const medication = await this.entityManager.findOneByOrFail(Medication, {
      id,
    });
    await this.entityManager.remove(Medication, medication);
  }
}
