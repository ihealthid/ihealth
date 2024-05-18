import { DateFormatter } from "@/components/DateFormatter";
import { TablePaginator } from "@/components/TablePaginator";
import {
  Prescription,
  useGetPrescriptionsQuery,
} from "@/services/api/prescription";
import {
  ActionIcon,
  Badge,
  CardSection,
  Flex,
  Group,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const getStatusColor = (status: string) => {
  return {
    3: "green",
    2: "gray",
    1: "red",
    0: "blue",
  }[status];
};

export const OrderTable = () => {
  const result = useGetPrescriptionsQuery();
  const { data, total } = result.data ?? { data: [], total: 0 };

  const rows = useMemo(
    () =>
      data.map((row) => (
        <Table.Tr key={row.id}>
          <TableTd>{row.id}</TableTd>
          <TableTd>
            <DateFormatter value={row.createdAt} format="DD-MM-YYYY hh:mm" />
          </TableTd>
          <TableTd>
            <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
          </TableTd>
          <TableTd>
            <Group justify="end">
              {row.status === 0 && (
                <Tooltip label="Lihat">
                  <ActionIcon
                    variant="subtle"
                    component={Link}
                    to={`/order/${row.id}`}
                  >
                    <IconEye />
                  </ActionIcon>
                </Tooltip>
              )}

              {row.status === 1 && (
                <Tooltip label="Lanjutkan">
                  <ActionIcon
                    variant="subtle"
                    component={Link}
                    to={`/pharmacist/order-add/${row.id}`}
                  >
                    <IconEdit />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </TableTd>
        </Table.Tr>
      )),
    [data]
  );

  return (
    <>
      <CardSection>
        <Table striped highlightOnHover>
          <TableThead>
            <TableTr>
              <TableTh>Order ID</TableTh>
              <TableTh>Tanggal</TableTh>
              <TableTh>Status</TableTh>
              <TableTh></TableTh>
            </TableTr>
          </TableThead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </CardSection>
      <Flex mt={24} justify="end">
        <TablePaginator total={total} />
      </Flex>
    </>
  );
};
