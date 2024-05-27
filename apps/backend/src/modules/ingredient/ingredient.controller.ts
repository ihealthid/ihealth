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
import { Ingredient } from './ingredient';
import { IngredientInputRequest } from './ingredient.request';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'ingredients',
})
export class IngredientController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(Ingredient), {
      sortableColumns: ['name'],
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(Ingredient, { id });
  }

  @Post()
  async create(@Body() data: IngredientInputRequest) {
    const ingredient = this.entityManager.create(Ingredient, data);
    return this.entityManager.save(ingredient);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<IngredientInputRequest>,
  ) {
    const ingredient = await this.entityManager.findOneByOrFail(Ingredient, {
      id,
    });
    const uData = this.entityManager.merge(Ingredient, ingredient, data);
    return this.entityManager.save(ingredient);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const ingredient = await this.entityManager.findOneByOrFail(Ingredient, {
      id,
    });
    return this.entityManager.remove(ingredient);
  }
}
