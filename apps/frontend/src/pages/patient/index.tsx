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
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Patient</Title>
          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetPatientsQuery}
            cols={[
              {
                header: "Identifies",
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
                header: "Full Name",
              },
              {
                keyIndex: "birthDate",
                header: "Birth Date",
                render: (row) => humanizedDate(row.birthDate),
              },
              {
                keyIndex: "address",
                header: "Address",
                render: (row) => (
                  <HoverCard>
                    <HoverCardTarget>
                      <Badge variant="subtle">Show</Badge>
                    </HoverCardTarget>
                    <HoverCardDropdown>
                      <Table>
                        <TableThead>
                          <TableTr>
                            <TableTh>Address</TableTh>
                            <TableTh>Village</TableTh>
                            <TableTh>District</TableTh>
                            <TableTh>Regency</TableTh>
                          </TableTr>
                        </TableThead>
                        <TableTbody>
                          {row.addresses?.map((address) => (
                            <TableTr key={address.id}>
                              <TableTd>
                                <Group>
                                  <span>{address.address}</span>
                                  {address.entries.map(({ code, value }) => (
                                    <span>
                                      {code.split("/").pop()?.toUpperCase()}{" "}
                                      {value}
                                    </span>
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
