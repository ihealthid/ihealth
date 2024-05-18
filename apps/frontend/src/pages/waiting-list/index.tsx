import {
  ActionIcon,
  Card,
  CardSection,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { Encounter, useGetEncountersQuery } from "@/services/api/encounter";
import {
  IconSortAscending,
  IconSortDescending,
  IconStethoscope,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SelectEncounterStatus } from "@/features/SelectEncounterStatus";
import { useMap } from "@mantine/hooks";
import _ from "lodash";
import dayjs from "dayjs";

export const Component = () => {
  const navigate = useNavigate();
  const sorter = useMap([["status.order", "desc"]]);
  const sort = _.map(
    Array.from(sorter.entries()),
    ([key, value]) => `${key}|${value}`
  );

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title order={4}>Daftar Tunggu</Title>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          queryParams={{
            "createdAt:dateAt": dayjs().format("YYYY-MM-DD"),
          }}
          cols={[
            {
              keyIndex: "id",
              header: "ID",
            },
            {
              keyIndex: "patient.fullName",
              header: "Pasien",
            },
            {
              header: (
                <Group>
                  <Text fw={700} size="sm">
                    Status
                  </Text>
                  {sorter.get("status.order") === "desc" ? (
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => sorter.set("status.order", "asc")}
                    >
                      <IconSortAscending />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => sorter.set("status.order", "desc")}
                    >
                      <IconSortDescending />
                    </ActionIcon>
                  )}
                </Group>
              ),
              render: (row) =>
                row.histories[row.histories.length - 1]?.status?.display,
            },
            createProTableColumnActions<Encounter>({
              actions: [
                {
                  icon: <IconStethoscope />,
                  label: "Observation",
                  onClick(row) {
                    navigate("/observation/" + row.id);
                  },
                },
              ],
            }),
          ]}
          headerSection={(setter) => (
            <Group p="md">
              <TextInput placeholder="Pencarian" onChange={(event) => {}} />
              <SelectEncounterStatus
                filter={["order.lte|2"]}
                onChange={(val) => setter({ "status:of": val })}
              />
              <DateInput
                clearable
                placeholder="Tanggal"
                onChange={(val) => {
                  setter({
                    "createdAt:dateAt": dayjs(val).format("YYYY-MM-DD"),
                  });
                }}
              />
            </Group>
          )}
        />
      </CardSection>
    </Card>
  );
};
