import { RoleType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class RoleCreateRequest {
  @IsString()
  name: string;

  @IsEnum(RoleType)
  type: RoleType;
}
