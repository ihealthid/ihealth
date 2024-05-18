import { Period } from './period';

export interface Telecom {
  use: string;
  system?: string;
  value?: string;
  rank?: number;
  period?: Period;
}
