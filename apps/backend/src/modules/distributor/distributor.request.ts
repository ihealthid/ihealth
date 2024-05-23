import { IsString } from 'class-validator';

export class DistributorInputRequest {
  @IsString()
  name: string;
}
