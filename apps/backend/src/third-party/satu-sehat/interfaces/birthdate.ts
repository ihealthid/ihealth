export interface BirthDateExtension {
  url: string;
  valueDateTime: Date;
}

export interface BirthDate {
  extension: BirthDateExtension[];
}
