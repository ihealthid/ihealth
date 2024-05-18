import { IsArray, IsNotEmpty } from 'class-validator';
import { ObservationEntryInput } from '../observation-entry/observation-entry.request';

export class ObservationUpdateInput {
  @IsArray()
  @IsNotEmpty()
  entries: ObservationEntryInput[];
}
