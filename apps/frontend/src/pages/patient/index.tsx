import {
  Badge,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { Patient, useGetPatientsQuery } from "@/services/api/patient";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { humanizedDate } from "@/utils/date";
import { EditSection } from "./components/EditSection";
import { SearchField } from "./components/SearchField";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Pasien</Title>
          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Tambah
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetPatientsQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                header: "Identitas",
                render: (row) => (
                  <Group>
                    {row.identifies?.map((item) => (
                      <Tooltip label={item.system}>
                        <Badge variant="subtle">{item.value}</Badge>
                      </Tooltip>
                    ))}
                  </Group>
                ),
              },
              {
                keyIndex: "fullName",
                header: "Nama Lengkap",
              },
              {
                keyIndex: "birthDate",
                header: "Tanggal Lahir",
                render: (row) => humanizedDate(row.birthDate),
              },
              {
                keyIndex: "address",
                header: "Alamat",
                render: (row) => (
                  <HoverCard>
                    <HoverCardTarget>
                      <Badge variant="subtle">Lihat Alamat</Badge>
                    </HoverCardTarget>
                    <HoverCardDropdown>
                      <Table>
                        <TableThead>
                          <TableTr>
                            <TableTh>Alamat</TableTh>
                            <TableTh>Desa/Kelurahan</TableTh>
                            <TableTh>Kecamatan</TableTh>
                            <TableTh>Kabupaten</TableTh>
                          </TableTr>
                        </TableThead>
                        <TableTbody>
                          {row.addresses.map((address) => (
                            <TableTr key={address.id}>
                              <TableTd>
                                <Group gap={0}>
                                  <Badge variant="subtle">
                                    {address.address}
                                  </Badge>
                                  {address.identifies?.map((identity) => (
                                    <Badge variant="subtle">
                                      {identity.system.split("/").pop()}{" "}
                                      {identity.value}
                                    </Badge>
                                  ))}
                                </Group>
                              </TableTd>
                              <TableTd>{address.village.name}</TableTd>
                              <TableTd>{address.village.district.name}</TableTd>
                              <TableTd>
                                {address.village.district.regency.name}
                              </TableTd>
                            </TableTr>
                          ))}
                        </TableTbody>
                      </Table>
                    </HoverCardDropdown>
                  </HoverCard>
                ),
              },
              createProTableColumnActions<Patient>({
                actions: [
                  {
                    icon: <IconEdit />,
                    label: "Edit",
                    onClick(row) {
                      editSectionRef.current?.open(row.id);
                    },
                  },
                ],
              }),
            ]}
            headerSection={(filter) => (
              <Flex p="md">
                <SearchField
                  onChange={(e) => {
                    filter({
                      [e.key]: e.value,
                    });
                  }}
                />
              </Flex>
            )}
          />
        </CardSection>
      </Card>

      <AddSection ref={addSectionRef} />
      <EditSection ref={editSectionRef} />
    </>
  );
};
