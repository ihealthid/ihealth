import { Controller, Get, Query } from '@nestjs/common';
import { SatuSehatService } from './satu-sehat.service';

@Controller({
  path: 'satu-sehat',
})
export class SatuSehatController {
  constructor(private satuSehatService: SatuSehatService) {}

  @Get()
  async test(@Query('nik') nik: string) {
    // return this.satuSehatService.findBayiByNIKIbu(nik);
  }
}
