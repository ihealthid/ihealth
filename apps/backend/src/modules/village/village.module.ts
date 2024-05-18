import { Module } from '@nestjs/common';
import { VillageController } from './village.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Village } from './village';

@Module({
  imports: [TypeOrmModule.forFeature([Village])],
  controllers: [VillageController],
})
export class VillageModule {}
