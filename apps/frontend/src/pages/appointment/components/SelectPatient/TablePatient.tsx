import { Patient, useLazyGetPatientsQuery } from "@/services/api/patient";
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
  search: string;
  onSelect: (row: Patient) => void;
}

export const TablePatient = ({ onSelect, search }: TablePatientProps) => {
  const [fetchPatient, { data }] = useLazyGetPatientsQuery();

  useEffect(() => {
    fetchPatient({
      page: 1,
      limit: 20,
      search,
    });
  }, [search, fetchPatient]);

  const rows = useMemo(
    () =>
      data
        ? data.data.map((row) => (
            <TableTr key={row.id}>
              <TableTd>{row.id}</TableTd>
              <TableTd>{row.nik}</TableTd>
              <TableTd>{row.fullName}</TableTd>
              <TableTd>{row.birthDate}</TableTd>
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
