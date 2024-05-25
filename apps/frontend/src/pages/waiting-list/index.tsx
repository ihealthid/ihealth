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
import { usePaginateQuery } from "@/hooks/usePaginateQuery";
import { Sortable } from "@/components/Sortable";
import { generateBetweenDateFilter } from "@/utils/generateBetweenDateFilter";
import _ from "lodash";

export const Component = () => {
  const navigate = useNavigate();
  const paginateQuery = usePaginateQuery();

  useEffect(() => {
    paginateQuery.set(
      "filter.createdAt",
      `$btw:${generateBetweenDateFilter()}`,
    );
  }, []);

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title order={4}>Daftar Tunggu</Title>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          query={{
            ...paginateQuery.get(),
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
                    navigate("/observation/" + row.id);
                  },
                },
              ],
            }),
          ]}
          headerSection={(q) => (
            <Group p="md">
              <TextInput
                placeholder="Pencarian"
                onChange={(event) => {
                  if (event.currentTarget.value.length > 0) {
                    q.set(
                      "filter.patient.fullName",
                      "$ilike:" + event.currentTarget.value,
                    );
                  } else {
                    q.delete("filter.patient.fullName");
                  }
                }}
              />
              <SelectEncounterStatus
                query={{
                  "filter.order": "$lte:2",
                }}
                onChange={(val) => {
                  if (_.isEmpty(val)) {
                    q.delete("filter.histories.status.id");
                  } else {
                    q.set("filter.histories.status.id", "$in:" + val.join(","));
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
                      "$btw:" + generateBetweenDateFilter(val),
                    );
                  } else {
                    paginateQuery.set(
                      "filter.createdAt",
                      "$btw:" + generateBetweenDateFilter(),
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
