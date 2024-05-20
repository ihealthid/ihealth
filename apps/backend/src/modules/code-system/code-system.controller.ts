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
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { CodeSystem } from './code-system';
import { CodeSystemInputRequest } from './code-system.request';
import { CodeSystemType } from '../code-system-type/code-system-type';
import { CodeSystemProperty } from '../code-system-property/code-system-property';
import { Coding } from '../coding/coding';

@Controller({
  path: 'code-systems',
})
export class CodeSystemController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(CodeSystem, {
      ...paginationQuery,
      relations: {
        type: true,
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(CodeSystem, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    { parentIds, notSelectable, isActive, ...data }: CodeSystemInputRequest,
  ) {
    const codeSystem = this.entityManager.create(CodeSystem, data);
    codeSystem.parents = await this.entityManager.find(CodeSystem, {
      where: {
        id: In(parentIds),
      },
    });
    return await this.entityManager.save(codeSystem);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id') id: string, @Body() data: any) {
    const codeSystem = await this.entityManager.findOneByOrFail(CodeSystem, {
      id,
    });
    const uData = this.entityManager.merge(CodeSystem, codeSystem, data);
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const codeSystem = await this.entityManager.findOneByOrFail(CodeSystem, {
      id,
    });
    await this.entityManager.remove(codeSystem);
    return codeSystem;
  }
}
