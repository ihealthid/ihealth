import { Controller, Get } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { Document, Paragraph, Table, TableCell, TableRow, Packer } from 'docx';
import { MinioService } from '../minio/minio.service';
import { WriteStream } from 'fs';

@Controller({
  path: 'tests',
})
export class TestController {
  constructor(
    private printerService: PrinterService,
    private minioService: MinioService,
  ) {}

  @Get()
  async get() {
    const buff = await this.minioService.get('Document1.html');
    console.log({ buff });
    this.printerService.printData(buff);
  }
}
