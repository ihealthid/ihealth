import {
  Identify,
  Patient,
  useLazyGetPatientsQuery,
} from "@/services/api/patient";
import { humanizedDate } from "@/utils/date";
import {
  Button,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { useEffect, useMemo } from "react";

interface TablePatientProps {
  search: { [key: string]: any };
  onSelect: (row: Patient) => void;
}

export const TablePatient = ({ onSelect, search }: TablePatientProps) => {
  const [fetchPatient, { data }] = useLazyGetPatientsQuery();

  useEffect(() => {
    fetchPatient({
      page: 1,
      limit: 20,
      filter: Array.from(Object.entries(search)).map((i) => i.join(":")),
    });
  }, [search, fetchPatient]);

  const getNIK = (data: Identify[]) =>
    data.find((i) => i.system.includes("nik"))?.value;

  const rows = useMemo(
    () =>
      data
        ? data.data.map((row) => (
            <TableTr key={row.id}>
              <TableTd>{row.id}</TableTd>
              <TableTd>{getNIK(row.identifies)}</TableTd>
              <TableTd>{row.fullName}</TableTd>
              <TableTd>{humanizedDate(row.birthDate)}</TableTd>
              <TableTd>
                <Button size="xs" onClick={() => onSelect(row)}>
                  Pilih
                </Button>
              </TableTd>
            </TableTr>
          ))
        : [],
    [data, onSelect]
  );

  return (
    <Table mt={24}>
      <TableThead>
        <TableTr>
          <TableTh>ID</TableTh>
          <TableTh>NIK</TableTh>
          <TableTh>Nama</TableTh>
          <TableTh>Tanggal Lahir</TableTh>
          <TableTh></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
};
