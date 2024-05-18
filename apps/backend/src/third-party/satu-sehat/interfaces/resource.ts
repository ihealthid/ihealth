import { Identifier } from './identifier';

export interface Meta {
  lastUpdated: string;
  versionId: string;
}

export interface Resource {
  active: boolean;
  id: string;
  resourceType: string;
  identifier: Identifier[];
  meta: Meta;
}
