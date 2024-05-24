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
import { useMemo, useState } from "react";
import { PaginationResult } from "@/types/pagination-result";
import { useSetState } from "@mantine/hooks";
export { createProTableColumnActions } from "./ProTableColumnActions";
import _ from "lodash";

interface ProTableProps<TData> {
  cols: ProTableColumn<TData>[];
  rowsPerPage?: number;
  queryLoader: UseQuery<
    QueryDefinition<any, any, any, PaginationResult<TData>>
  >;
  queryParams?: Record<string, any>;
  pathParams?: Record<string, any>;
  sort?: string[];
  headerSection?: (
    setter: (
      statePartial:
        | Partial<Record<string, any>>
        | ((currentState: Record<string, any>) => Partial<Record<string, any>>),
    ) => void,
  ) => React.ReactNode;
}

export const ProTable = <TData extends Record<string, any>>({
  cols,
  queryLoader: useQueryLoader,
  queryParams = {},
  pathParams = {},
  sort = [],
  rowsPerPage = 10,
  headerSection,
}: ProTableProps<TData>) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useSetState<Record<string, any>>({});

  const { data } = useQueryLoader({
    ...pathParams,
    page,
    filter: Array.from(Object.entries({ ...queryParams, ...filter })).map(
      (val) => val.join(":"),
    ),
    sort,
  });

  const pages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.total / rowsPerPage);
  }, [data, rowsPerPage]);

  const rows = useCreateProTableRows({
    data: data?.data ?? [],
    cols,
  });

  return (
    <>
      {headerSection?.(setFilter)}

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
        <Pagination total={pages} onChange={setPage} />
      </Flex>
    </>
  );
};
