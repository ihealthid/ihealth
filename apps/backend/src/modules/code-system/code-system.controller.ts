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
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
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

interface Property {
  code: string;
  valueCode?: string;
  valueBoolean?: boolean;
  valueString?: string;
  valueCoding?: {
    system: string;
    code: string;
  };
}

@Controller({
  path: 'code-systems',
})
export class CodeSystemController {
  constructor(
    @InjectRepository(CodeSystem)
    private codeSystemRepository: Repository<CodeSystem>,
    @InjectRepository(CodeSystemProperty)
    private codeSystemPropertyRepository: Repository<CodeSystemProperty>,
    @InjectRepository(Coding)
    private codingRepository: Repository<Coding>,
    @InjectRepository(CodeSystemType)
    private codeSystemTypeRepository: Repository<CodeSystemType>,
    private dataSource: DataSource,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(
    @Pagination() { take, skip, filter }: PaginationQuery,
  ) {
    return this.codeSystemRepository.findAndCount({
      take,
      skip,
      relations: {
        type: true,
      },
      where: filter,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.codeSystemRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    { parentIds, notSelectable, isActive, ...data }: CodeSystemInputRequest,
  ) {
    const codeSystem = this.codeSystemRepository.create(data);
    codeSystem.parents = await this.codeSystemRepository.find({
      where: {
        id: In(parentIds),
      },
    });
    return await this.codeSystemRepository.save(codeSystem);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const codeSystem = await this.codeSystemRepository.findOneByOrFail({
      id,
    });
    const uData = this.codeSystemRepository.merge(codeSystem, data);
    return this.codeSystemRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const codeSystem = await this.codeSystemRepository.findOneByOrFail({
      id,
    });
    await this.codeSystemRepository.remove(codeSystem);
    return codeSystem;
  }
}
