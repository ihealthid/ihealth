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
import { AuthGuard } from '../auth/auth.guard';
import { InjectEntityManager } from '@nestjs/typeorm';
import { HealthcareService } from './healthcare-service';
import { EntityManager } from 'typeorm';

@Controller({
  path: 'healthcare-services',
})
export class HealthcareServiceController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: HealthcareServiceInputRequest) {
    const healthcareService = this.entityManager.create(
      HealthcareService,
      data,
    );
    return this.entityManager.save(healthcareService);
  }

  @Get()
  @UseGuards(AuthGuard)
  async paginate(@Pagination() pagination: PaginationQuery) {
    return this.entityManager.findAndCount(HealthcareService, pagination);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(HealthcareService, {
      id,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
