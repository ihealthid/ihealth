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
import { CodeSystemType } from './code-system-type';
import { CodeSystemTypeInput } from './code-system-type.input';

@Controller({
  path: 'code-system-types',
})
export class CodeSystemTypeController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(CodeSystemType, paginationQuery);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(CodeSystemType, { id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CodeSystemTypeInput) {
    const codeSystemType = this.entityManager.create(CodeSystemType, data);
    return this.entityManager.save(codeSystemType);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id') id: string,
    @Body() data: Partial<CodeSystemTypeInput>,
  ) {
    const codeSystemType = await this.entityManager.findOneByOrFail(
      CodeSystemType,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(
      CodeSystemType,
      codeSystemType,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    const codeSystemType = await this.entityManager.findOneByOrFail(
      CodeSystemType,
      {
        id,
      },
    );
    await this.entityManager.remove(codeSystemType);
    return codeSystemType;
  }
}
