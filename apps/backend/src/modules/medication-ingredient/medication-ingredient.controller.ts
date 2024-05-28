import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { MedicationIngredient } from './medication-ingredient';
import { MedicationIngredientInputRequest } from './medication-ingredient.request';
import {
  FilterOperator,
  Paginate,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';

@Controller({
  path: 'medication-ingredients',
})
export class MedicationIngredientController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(
      query,
      this.entityManager.getRepository(MedicationIngredient),
      {
        sortableColumns: ['createdAt'],
        filterableColumns: {
          medicationId: [FilterOperator.EQ],
        },
        relations: {
          medication: true,
          ingredient: true,
        },
      },
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(MedicationIngredient, {
      where: { id },
      relations: {
        medication: true,
        ingredient: true,
      },
    });
  }

  @Post()
  async create(@Body() data: MedicationIngredientInputRequest) {
    const medicationIngredient = this.entityManager.create(
      MedicationIngredient,
      data,
    );
    return this.entityManager.save(medicationIngredient);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<MedicationIngredientInputRequest>,
  ) {
    const medicationIngredient = await this.entityManager.findOneByOrFail(
      MedicationIngredient,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      MedicationIngredient,
      medicationIngredient,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const medicationIngredient = await this.entityManager.findOneByOrFail(
      MedicationIngredient,
      {
        id,
      },
    );
    return this.entityManager.remove(medicationIngredient);
  }
}
