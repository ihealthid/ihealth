import { IsString } from 'class-validator';

export class RoleCreateRequest {
  @IsString()
  name: string;

  @IsString()
  type: string;
}
