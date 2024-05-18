import { IsEnum, IsString } from 'class-validator';

export class ObservationEntryInput {
  @IsString()
  code: string;

  @IsEnum(['string', 'number', 'boolean'])
  type: string;

  @IsString()
  value: string;
}
