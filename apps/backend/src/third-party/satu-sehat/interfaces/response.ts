export interface Entry<T> {
  fullUrl: string;
  resource: T;
}

export interface SatuSehatResponse<T> {
  entry: Entry<T>[];
}
