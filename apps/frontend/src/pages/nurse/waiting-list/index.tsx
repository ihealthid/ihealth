import {
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
import { IconStethoscope } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SelectEncounterStatus } from "@/features/SelectEncounterStatus";
import { useEffect } from "react";
import { Sortable } from "@/components/Sortable";
import { generateBetweenDateFilter } from "@/utils/generateBetweenDateFilter";
import _ from "lodash";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const navigate = useNavigate();
  const paginateQuery = usePaginateQuery();

  useEffect(() => {
    paginateQuery.set("filter.createdAt", generateBetweenDateFilter());
  }, []);

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title order={4}>Daftar Tunggu</Title>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          query={paginateQuery.get()}
          options={{
            pollingInterval: 100,
          }}
          cols={[
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
                  <Sortable
                    onChange={(sort) =>
                      paginateQuery.set("sortBy", `status.order:${sort}`)
                    }
                  />
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
                    navigate("/nurse/observation/" + row.id);
                  },
                },
              ],
            }),
          ]}
          headerSection={() => (
            <Group p="md">
              <TextInput
                placeholder="Pencarian"
                onChange={(event) => {
                  if (event.currentTarget.value.length > 0) {
                    paginateQuery.set(
                      "filter.patient.fullName",
                      "$ilike:" + event.currentTarget.value,
                    );
                  } else {
                    paginateQuery.delete("filter.patient.fullName");
                  }
                }}
              />
              <SelectEncounterStatus
                query={{
                  "filter.order": "$lte:2",
                }}
                onChange={(val) => {
                  if (_.isEmpty(val)) {
                    paginateQuery.delete("filter.histories.status.id");
                  } else {
                    paginateQuery.set(
                      "filter.histories.status.id",
                      "$in:" + val.join(","),
                    );
                  }
                }}
              />
              <DateInput
                clearable
                placeholder="Tanggal"
                onChange={(val) => {
                  if (val) {
                    paginateQuery.set(
                      "filter.createdAt",
                      generateBetweenDateFilter(val),
                    );
                  } else {
                    paginateQuery.set(
                      "filter.createdAt",
                      generateBetweenDateFilter(),
                    );
                  }
                }}
              />
            </Group>
          )}
        />
      </CardSection>
    </Card>
  );
};
