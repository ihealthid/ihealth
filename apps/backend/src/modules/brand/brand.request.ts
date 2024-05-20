import { IsString } from 'class-validator';

export class BrandInputRequest {
  @IsString()
  manufactureId: string;

  @IsString()
  name: string;
}
