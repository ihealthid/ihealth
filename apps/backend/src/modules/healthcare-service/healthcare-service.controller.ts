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
import { HealthcareServiceInputRequest } from './healthcare-service.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectEntityManager } from '@nestjs/typeorm';
import { HealthcareService } from './healthcare-service';
import { EntityManager } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';

@Controller({
  path: 'healthcare-services',
})
export class HealthcareServiceController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: HealthcareServiceInputRequest) {
    const healthcareService = this.entityManager.create(
      HealthcareService,
      data,
    );
    return this.entityManager.save(healthcareService);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(
      query,
      this.entityManager.getRepository(HealthcareService),
      {
        sortableColumns: ['name'],
      },
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(HealthcareService, {
      id,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Partial<HealthcareServiceInputRequest>,
  ) {
    const healthcareService = await this.entityManager.findOneByOrFail(
      HealthcareService,
      {
        id,
      },
    );

    const uData = this.entityManager.merge(
      HealthcareService,
      healthcareService,
      data,
    );
    return this.entityManager.save(uData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const healthcareService = await this.entityManager.findOneByOrFail(
      HealthcareService,
      {
        id,
      },
    );
    return this.entityManager.delete(HealthcareService, healthcareService);
  }
}
