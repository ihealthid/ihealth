import type { UseQuery } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  Flex,
  Pagination,
  ScrollArea,
} from "@mantine/core";
import { ProTableColumn, useCreateProTableRows } from "./useCreateProTableRows";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { PaginationResult } from "@/types/pagination-result";
export { createProTableColumnActions } from "./ProTableColumnActions";
import _ from "lodash";
import { PaginateQuery, usePaginateQuery } from "@/hooks/usePaginateQuery";

interface ProTableProps<TData> {
  cols: ProTableColumn<TData>[];
  rowsPerPage?: number;
  queryLoader: UseQuery<
    QueryDefinition<any, any, any, PaginationResult<TData>>
  >;
  pathParams?: Record<string, any>;
  query?: { [key: string]: string };
  headerSection?: (paginateQuery: PaginateQuery) => React.ReactNode;
}

export const ProTable = <TData extends Record<string, any>>({
  cols,
  queryLoader: useQueryLoader,
  pathParams = {},
  rowsPerPage = 10,
  query = {},
  headerSection,
}: ProTableProps<TData>) => {
  const [page, setPage] = useState(1);
  const paginateQuery = usePaginateQuery();

  const { data } = useQueryLoader({
    page,
    limit: rowsPerPage,
    ...pathParams,
    ...query,
    ...paginateQuery.get(),
  });

  const rows = useCreateProTableRows({
    data: data?.data ?? [],
    cols,
  });

  return (
    <>
      {headerSection?.(paginateQuery)}

      <ScrollArea>
        <Table striped highlightOnHover>
          <TableThead>
            <TableTr>
              {cols.map((col) => (
                <TableTh ta={col.textAlign}>{col.header}</TableTh>
              ))}
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
      </ScrollArea>

      <Flex justify="end" p="md">
        <Pagination total={data?.meta.totalPages ?? 0} onChange={setPage} />
      </Flex>
    </>
  );
};
