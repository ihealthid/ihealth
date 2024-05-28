import {
  ActionIcon,
  Badge,
  CardSection,
  Flex,
  Group,
  Table,
  Tooltip,
} from "@mantine/core";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { IconStethoscope } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { TablePaginator } from "@/components/TablePaginator";
import { DateValue } from "@mantine/dates";
import { useDebouncedState } from "@mantine/hooks";
import { useGetEncountersQuery } from "@/services/api/encounter";
const { Thead, Tr, Td, Th, Tbody } = Table;

export interface AppointmentTableRef {
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  setStatus: (status: string[]) => void;
  setDate: (date: DateValue) => void;
}

export const AppointmentTable = forwardRef<AppointmentTableRef>((_, ref) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useDebouncedState("", 500);
  const [status, setStatus] = useState<string[]>(["screened"]);
  const [date, setDate] = useState<DateValue>();

  const { data } = useGetEncountersQuery({
    page,
    limit: 10,
    status,
    date,
    search,
  });

  useImperativeHandle(ref, () => ({
    setPage,
    setStatus,
    setDate,
    setSearch,
  }));

  const rows = useMemo(
    () =>
      (data?.data ?? []).map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.patient.fullName}</Td>
          <Td>{item.clinicService.name}</Td>
          <Td>
            <Group>
              {item.diagnose ? (
                <>
                  {item.diagnose?.status === "done" ? (
                    <Badge color="blue">Diagnosed</Badge>
                  ) : (
                    <Badge color="green">Checking</Badge>
                  )}
                </>
              ) : item.screening ? (
                <Badge color="yellow">Screened</Badge>
              ) : null}
            </Group>
          </Td>
          <Td>
            <Group justify="end">
              <Tooltip label="Diagnosa">
                <ActionIcon
                  component={Link}
                  to={`/doctor/diagnose/${item.id}`}
                  variant="subtle"
                >
                  <IconStethoscope />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Td>
        </Tr>
      )),
    [data]
  );

  return (
    <>
      <CardSection mt="md">
        <Table striped highlightOnHover>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nama</Th>
              <Th>Jenis Kunjungan</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </CardSection>

      <Flex mt="md" justify="end">
        <TablePaginator limit={10} total={data?.total} onChange={setPage} />
      </Flex>
    </>
  );
});
