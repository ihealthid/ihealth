export type PaginationQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  filter?: string[];
  sort?: string[];
  [key: string]: any;
};
