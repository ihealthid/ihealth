import { Address } from '@prisma/client';
import { BirthDate } from './birthdate';
import { Period } from './period';
import { Telecom } from './telecom';
import { Contact } from './contact';
import { ManagingOrganization } from './managing-organization';
import { Resource } from './resource';
import { MaritalStatus } from 'src/modules/marital-status/marital-status';

export interface Name {
  use: string;
  family?: string;
  given: string[];
  period?: Period;
}

export interface Patient extends Resource {
  text: Text;
  name: Name[];
  telecom: Telecom[];
  jeniskelamin: string;
  birthDate: Date;
  _birthDate: BirthDate;
  deceasedBoolean: boolean;
  address: Address[];
  contact: Contact[];
  managingOrganization: ManagingOrganization;
}

export interface PatientInput {
  name: string;
  nik: string;
  gender: 'male' | 'female';
  birthDate: string;
  maritalStatus: MaritalStatus;
  telecom?: {
    phone?: string;
    email?: string;
  };
}
