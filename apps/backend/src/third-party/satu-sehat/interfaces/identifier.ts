import { Assigner } from './assigner';
import { CodingType } from './coding';
import { Period } from './period';

export interface Identifier {
  use: string;
  type: CodingType;
  system: string;
  value: string;
  period: Period;
  assigner: Assigner;
}
