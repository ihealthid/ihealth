import { Module } from '@nestjs/common';
import { PrescriptionItemController } from './prescription-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionItem } from './prescription-item';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionItem])],
  controllers: [PrescriptionItemController],
})
export class PrescriptionItemModule {}
