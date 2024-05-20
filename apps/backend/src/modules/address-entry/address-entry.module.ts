import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntry } from './address-entry';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntry])],
})
export class AddressEntryModule {}
