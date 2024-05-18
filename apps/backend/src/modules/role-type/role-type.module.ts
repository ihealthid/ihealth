import { Module } from '@nestjs/common';
import { RoleTypeController } from './role-type.controller';

@Module({
  controllers: [RoleTypeController],
})
export class RoleTypeModule {}
