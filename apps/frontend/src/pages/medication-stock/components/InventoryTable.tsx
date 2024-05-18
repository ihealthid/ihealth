import { TablePaginator } from "@/components/TablePaginator";
import { useGetMedicationBatchQuery } from "@/services/api/medication";
import { humanizedDate } from "@/utils/date";
import {
  CardSection,
  Flex,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { useMemo } from "react";

interface InventoryTableProps {
  medicationId: number;
}

export const InventoryTable = ({ medicationId }: InventoryTableProps) => {
  const { data } = useGetMedicationBatchQuery({
    medicationId,
  });
  const rows = useMemo(
    () =>
      data
        ? data.data.map((item) => (
            <TableTr key={item.id}>
              <TableTd>{humanizedDate(item.createdAt)}</TableTd>
              <TableTd>{humanizedDate(item.expiredAt)}</TableTd>
              <TableTd>{item.quantity}</TableTd>
              <TableTd></TableTd>
            </TableTr>
          ))
        : [],
    [data]
  );

  return (
    <>
      <CardSection>
        <Table striped highlightOnHover>
          <TableThead>
            <TableTr>
              <TableTh>Tanggal</TableTh>
              <TableTh>Kadaluarsa</TableTh>
              <TableTh>Kuantitas</TableTh>
              <TableTh></TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
      </CardSection>

      <Flex justify="end" mt="md">
        <TablePaginator total={data?.total} />
      </Flex>
    </>
  );
};
