import {
  ActionIcon,
  Badge,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Tooltip,
} from "@mantine/core";
import { useMemo } from "react";
import { IconEdit } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "@/services/api/user";
import { ButtonDelete } from "./ButtonDelete";

export const UserTable = () => {
  const { data } = useGetUsersQuery();
  const items = data?.data ?? [];

  const rows = useMemo(
    () =>
      items.map((item) => (
        <TableTr key={item.id}>
          <TableTd>{item.id}</TableTd>
          <TableTd>{item.fullName}</TableTd>
          <TableTd>{item.username}</TableTd>
          <TableTd>
            {item.roles.map((roleItem) => (
              <Badge key={roleItem.name}>{roleItem.name}</Badge>
            ))}
          </TableTd>
          <TableTd>
            <Group justify="end">
              <Tooltip label="Edit Pengguna">
                <ActionIcon
                  component={Link}
                  to={`/administrator/user/${item.id}`}
                  variant="subtle"
                >
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <ButtonDelete id={item.id} />
            </Group>
          </TableTd>
        </TableTr>
      )),
    [items]
  );

  return (
    <Table striped highlightOnHover>
      <TableThead>
        <TableTr>
          <TableTh>ID</TableTh>
          <TableTh>Nama</TableTh>
          <TableTh>Username</TableTh>
          <TableTh>Hak Akses</TableTh>
          <TableTh></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
};
