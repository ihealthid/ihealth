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
import { PatientCondition } from './patient-condition';

@Controller({
  path: 'patient-conditions',
})
export class PatientConditionController {
  constructor(
    @InjectRepository(PatientCondition)
    private patientConditionRepository: Repository<PatientCondition>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.patientConditionRepository.findAndCount({
      take,
      skip,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.patientConditionRepository.findOneByOrFail({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const patientCondition = this.patientConditionRepository.create(data);
    return this.patientConditionRepository.save(patientCondition);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const patientCondition =
      await this.patientConditionRepository.findOneByOrFail({
        id,
      });
    const uData = this.patientConditionRepository.merge(patientCondition, data);
    return this.patientConditionRepository.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const patientCondition =
      await this.patientConditionRepository.findOneByOrFail({
        id,
      });
    await this.patientConditionRepository.remove(patientCondition);
    return;
  }
}
