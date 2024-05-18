export interface Coding {
  system: string;
  code: string;
}

export interface CodingType {
  coding: Coding[];
}
