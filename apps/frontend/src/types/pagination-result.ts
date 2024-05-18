export type PaginationResult<T> = {
  message: string
  total: number;
  data: T[];
};
