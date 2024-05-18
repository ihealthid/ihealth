import { Controller, Get } from '@nestjs/common';

@Controller({
  path: '/role-types',
})
export class RoleTypeController {
  @Get()
  async all() {
    return ['medic', 'non_medic'];
  }
}
