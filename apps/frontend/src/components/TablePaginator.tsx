import { Pagination, PaginationProps } from "@mantine/core";

interface TablePaginatorProps extends Omit<PaginationProps, "total"> {
  limit?: number;
  total?: number;
}

export const TablePaginator = ({
  total = 0,
  limit = 10,
  ...props
}: TablePaginatorProps) => {
  const pages = Math.ceil(total / limit);

  return <Pagination {...props} total={pages} />;
};
