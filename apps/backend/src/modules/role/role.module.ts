import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
})
export class RoleModule {}
