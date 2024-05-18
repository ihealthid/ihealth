import { Module } from '@nestjs/common';
import { RFIDController } from './rfid.controller';

@Module({
  controllers: [RFIDController],
})
export class RFIDModule {}
