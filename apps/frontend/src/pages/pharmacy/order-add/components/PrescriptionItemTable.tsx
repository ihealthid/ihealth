import { useGetPrescriptionQuery } from "@/services/api/prescription";
import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  NumberFormatter,
} from "@mantine/core";
import { useMemo } from "react";
import { ButtonDelete } from "./ButtonDelete";

interface PrescriptionItemTableProps {
  id: number;
}
export const PrescriptionItemTable = ({ id }: PrescriptionItemTableProps) => {
  const { data } = useGetPrescriptionQuery(id);
  const rows = useMemo(
    () =>
      data
        ? data.data.items.map((row, idx) => (
            <TableTr key={row.id}>
              <TableTd>{idx + 1}</TableTd>
              <TableTd>Paracetamol</TableTd>
              <TableTd>
                <NumberFormatter
                  value={row.medication.price}
                  thousandSeparator
                />
              </TableTd>
              <TableTd>{row.quantity}</TableTd>
              <TableTd>
                <NumberFormatter
                  value={row.medication.price * row.quantity}
                  thousandSeparator
                />
              </TableTd>
              <TableTd>
                <ButtonDelete id={row.id} />
              </TableTd>
            </TableTr>
          ))
        : [],
    [data]
  );

  return (
    <Table striped highlightOnHover>
      <TableThead>
        <TableTr>
          <TableTh>No</TableTh>
          <TableTh>Nama</TableTh>
          <TableTh>Harga</TableTh>
          <TableTh>Kuantitas</TableTh>
          <TableTh>Subtotal</TableTh>
          <TableTh></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
};
