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
import { Repository } from 'typeorm';
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
    @InjectRepository(CodeSystemType)
    private codeSystemRepository: Repository<CodeSystemType>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.codeSystemRepository.findAndCount({
      take,
      skip,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.codeSystemRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CodeSystemTypeInput) {
    const codeSystemType = this.codeSystemRepository.create(data);
    return this.codeSystemRepository.save(codeSystemType);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CodeSystemTypeInput>,
  ) {
    const codeSystemType = await this.codeSystemRepository.findOneByOrFail({
      id,
    });
    const uData = this.codeSystemRepository.merge(codeSystemType, data);
    return this.codeSystemRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const codeSystemType = await this.codeSystemRepository.findOneByOrFail({
      id,
    });
    await this.codeSystemRepository.remove(codeSystemType);
    return codeSystemType;
  }
}
