import { Address } from './address';
import { CodingType } from './coding';
import { Family } from './family';
import { Period } from './period';
import { Telecom } from './telecom';

export interface ContactName {
  family: string;
  _family: Family;
  given: string[];
}

export interface Contact {
  relationship: CodingType[];
  name: ContactName;
  telecom: Telecom[];
  address: Address;
  gender: string;
  period: Period;
}
