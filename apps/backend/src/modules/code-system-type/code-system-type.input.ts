import { IsOptional, IsString } from 'class-validator';

export class CodeSystemTypeInput {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  definition?: string;
}
