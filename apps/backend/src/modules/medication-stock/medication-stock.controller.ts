import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { MedicationStockInputRequest } from './medication-stock.request';
import { MedicationStock } from './medication-stock';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { MedicationInventory } from '../medication-inventory/medication-inventory';
import { Medication } from '../medication/medication';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user';

@Controller({
  path: 'medication-stocks',
})
export class MedicationStockController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(MedicationStock), {
      sortableColumns: ['createdAt', 'balance', 'expiredAt'],
      filterableColumns: {
        medicationId: [FilterOperator.EQ],
      },
      relations: {
        medication: true,
      },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: MedicationStockInputRequest) {
    await this.entityManager.transaction(async (trx) => {
      const stock = trx.create(MedicationStock, data);
      await this.entityManager.save(stock);

      const inventory = trx.create(MedicationInventory, data);
      await trx.save(inventory);

      const medication = await trx.findOne(Medication, {
        where: { id: data.medicationId },
      });
      medication.stock = medication.stock + data.quantity;
      await trx.save(medication);
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req, @Param('id') id: string) {
    const user = await this.entityManager.findOneOrFail(User, {
      where: { id: req.user.id },
      relations: {
        roles: true,
      },
    });

    if (!user.roles.find((row) => row.name === 'Administrator')) {
      throw new NotAcceptableException();
    }

    const stock = await this.entityManager.findOneByOrFail(MedicationStock, {
      id,
    });
    await this.entityManager.remove(stock);
  }
}
