import { Controller, Get, Query } from '@nestjs/common';

@Controller({
  path: 'rfid',
})
export class RFIDController {
  @Get()
  async get(@Query('id') id: string) {
    console.log({ id });
    return { id };
  }
}
