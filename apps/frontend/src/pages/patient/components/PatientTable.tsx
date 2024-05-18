import {
  ActionIcon,
  CardSection,
  Flex,
  Group,
  Table,
  Tooltip,
} from "@mantine/core";
import { useMemo } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useGetPatientsQuery } from "@/services/api/patient";
import { Link } from "react-router-dom";
import { ButtonDelete } from "../button-delete";
import dayjs from "dayjs";
import { TablePaginator } from "@/components/TablePaginator";
const { Thead, Tr, Td, Th, Tbody } = Table;

export const PatientTable = () => {
  const { data } = useGetPatientsQuery({
    page: 1,
    limit: 20,
  });

  const rows = useMemo(
    () =>
      (data?.data ?? []).map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.nik}</Td>
          <Td>{item.fullName}</Td>
          <Td>
            {item.birthDate && dayjs(item.birthDate).format("DD MMM YYYY")}
          </Td>
          <Td>
            {item.address.address}, {item.address.subdistrict.name},{" "}
            {item.address.subdistrict.district.name},{" "}
            {item.address.subdistrict.district.regency.name},{" "}
            {item.address.subdistrict.district.regency.province.name}
          </Td>
          <Td>
            <Group justify="end">
              <Tooltip label="Edit Pasien">
                <ActionIcon
                  component={Link}
                  to={`/patient/${item.id}`}
                  variant="subtle"
                >
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <ButtonDelete id={item.id} />
            </Group>
          </Td>
        </Tr>
      )),
    [data]
  );

  return (
    <>
      <CardSection>
        <Table striped highlightOnHover>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>NIK</Th>
              <Th>Nama</Th>
              <Th>Tanggal Lahir</Th>
              <Th>Alamat</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </CardSection>

      <Flex justify="end" mt="md">
        <TablePaginator limit={10} total={data?.total} />
      </Flex>
    </>
  );
};
