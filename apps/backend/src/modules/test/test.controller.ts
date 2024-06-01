import { Controller, Get } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { Document, Paragraph, Table, TableCell, TableRow, Packer } from 'docx';
import { MinioService } from '../minio/minio.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Controller({
  path: 'tests',
})
export class TestController {
  constructor(
    private printerService: PrinterService,
    // private minioService: MinioService,
    private whatsappService: WhatsappService
  ) {}

  @Get()
  async get() {
    // const buff = await this.minioService.get('Struk.html');
    // this.printerService.printToThermal(buff);
    // const EscPostEncoder = require('esc-pos-encoder');
    // const encoder = new EscPostEncoder();
    // const result = encoder
    //   .initialize()
    //   .text('Hello, Klinik Mentari Medika')
    //   .newline()
    //   .qrcode('https://klinikmentarimedika.id')
    //   .encode();
    // this.printerService.printData(Buffer.from(result.buffer));
    return this.whatsappService.getQr()
  }
}
