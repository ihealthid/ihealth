import { Period } from './period';

export interface Address {
  use: string;
  type: string;
  text?: string;
  line: string[];
  city: string;
  district: string;
  state: string;
  postalCode: string;
  period: Period;
}
