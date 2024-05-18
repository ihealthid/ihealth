import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [],
  controllers: [],
})
export class AddressModule {}
