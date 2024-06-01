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
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);
  const paginateQuery = usePaginateQuery();

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
            query={paginateQuery.get()}
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
            headerSection={() => (
              <Flex p="md">
                <TextInput
                  placeholder="Search..."
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    if (val.length > 0) {
                      paginateQuery.set(
                        "filter.fullName",
                        "$or:$ilike:" + e.currentTarget.value,
                      );
                      paginateQuery.set(
                        "filter.identifies.value",
                        "$or:$ilike:" + e.currentTarget.value,
                      );
                    } else {
                      paginateQuery.delete("filter.fullName");
                      paginateQuery.delete("filter.identifiers.value");
                    }
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
