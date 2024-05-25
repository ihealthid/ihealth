export type PaginationResult<T> = {
  message: string;
  data: T[];
  links: {
    current: string;
  };
  meta: {
    currentPage: number;
    filter: {
      [key: string]: string;
    };
    itemsPerPage: number;
    sortBy: [[string, "ASC" | "DESC"]];
    totalItems: number;
    totalPages: number;
  };
};
