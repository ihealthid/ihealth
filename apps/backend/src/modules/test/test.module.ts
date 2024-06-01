import { Module } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { TestController } from './test.controller';
import { MinioService } from '../minio/minio.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Module({
  imports: [],
  providers: [PrinterService, MinioService],
  controllers: [TestController],
})
export class TestModule {}
