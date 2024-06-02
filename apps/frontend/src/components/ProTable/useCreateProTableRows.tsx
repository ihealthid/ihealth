import { TableTr, TableTd, StyleProp } from "@mantine/core";
import _ from "lodash";

export interface ProTableColumn<TData> {
  keyIndex?: string;
  header?: React.ReactNode;
  copyable?: boolean;
  textAlign?: StyleProp<React.CSSProperties["textAlign"]>;
  sortable?: (value: "ASC" | "DESC") => void;
  render?: (row: TData, index: number) => React.ReactNode;
}

interface UseCreateProTableRowsProps<TData> {
  data: TData[];
  cols: ProTableColumn<TData>[];
}

export const useCreateProTableRows = <TData extends Record<string, any>>({
  data,
  cols,
}: UseCreateProTableRowsProps<TData>): React.ReactNode[] => {
  return data.map((row, index) => (
    <TableTr key={index}>
      {cols.map((col, idx) => (
        <TableTd key={idx} ta={col.textAlign}>
          {col.render
            ? col.render(row, index)
            : col.keyIndex
              ? _.get(row, col.keyIndex)
              : null}
        </TableTd>
      ))}
    </TableTr>
  ));
};
