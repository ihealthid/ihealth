import { Controller, Get } from '@nestjs/common';
import { RoleType } from '@prisma/client';

@Controller({
  path: '/role-types',
})
export class RoleTypeController {
  @Get()
  async all() {
    return Object.keys(RoleType).map((item) => item);
  }
}
