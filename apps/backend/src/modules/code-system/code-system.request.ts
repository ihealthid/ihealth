import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CodeSystemInputRequest {
  @IsString()
  typeId: string;

  @IsString()
  system: string;

  @IsString()
  code: string;

  @IsString()
  display: string;

  @IsString()
  @IsOptional()
  definition?: string;

  @IsBoolean()
  @IsOptional()
  notSelectable?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber(
    {},
    {
      each: true,
    },
  )
  @IsOptional()
  parentIds: string[];
}
