import { InjectEntityManager } from '@nestjs/typeorm';
import { Paginate, PaginateQuery, paginate } from 'nestjs-paginate';
import { EntityManager } from 'typeorm';
import { PaymentMethod } from './payment-method';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentMethodInput } from './payment-method.dto';

@Controller({
  path: 'payment-methods',
})
export class PaymentMethodController {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Paginate() query: PaginateQuery) {
    return paginate(query, this.entityManager.getRepository(PaymentMethod), {
      sortableColumns: ['code', 'display'],
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: PaymentMethodInput) {
    const paymentMethod = this.entityManager.create(PaymentMethod, data);
    await this.entityManager.save(paymentMethod);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneByOrFail(PaymentMethod, {
      id,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PaymentMethodInput>,
  ) {
    const paymentMethod = await this.entityManager.findOneByOrFail(
      PaymentMethod,
      {
        id,
      },
    );
    const uData = this.entityManager.merge(PaymentMethod, paymentMethod, data);
    return this.entityManager.save(uData);
  }
}
