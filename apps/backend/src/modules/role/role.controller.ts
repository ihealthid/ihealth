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
import { RoleCreateRequest } from './role.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: '/roles',
})
export class RoleController {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: RoleCreateRequest) {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<RoleCreateRequest>,
  ) {
    const role = await this.roleRepository.findOneByOrFail({ id });
    const uData = this.roleRepository.merge(role, data);
    return this.roleRepository.save(uData);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.roleRepository.findOneByOrFail({ id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginate(@Pagination() { take, skip }: PaginationQuery) {
    return this.roleRepository.findAndCount({
      take,
      skip,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleRepository.findOneByOrFail({ id });
    await this.roleRepository.delete(role);
    return role;
  }
}
