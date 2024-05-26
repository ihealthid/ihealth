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

interface ProTableProps<TData> {
  cols: ProTableColumn<TData>[];
  limit?: number;
  queryLoader: UseQuery<
    QueryDefinition<any, any, any, PaginationResult<TData>>
  >;
  query?: { [key: string]: string | string[] };
  headerSection?: () => React.ReactNode;
}

export const ProTable = <TData extends Record<string, any>>({
  cols,
  queryLoader: useQueryLoader,
  query,
  limit = 10,
  headerSection,
}: ProTableProps<TData>) => {
  const [page, setPage] = useState(1);
  const { data } = useQueryLoader({
    ...query,
    page,
    limit,
  });

  const rows = useCreateProTableRows({
    data: data?.data ?? [],
    cols,
  });

  return (
    <>
      {headerSection?.()}

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
