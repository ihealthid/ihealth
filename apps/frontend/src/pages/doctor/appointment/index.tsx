import {
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { Encounter, useGetEncountersQuery } from "@/services/api/encounter";
import { IconStethoscope } from "@tabler/icons-react";
import { SelectEncounterStatus } from "@/features/SelectEncounterStatus";
import { useNavigate } from "react-router-dom";
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
        <Title order={4}>Daftar Pertemuan</Title>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          query={paginateQuery.get()}
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
              header: "Status",
              render: (row) =>
                row.histories[row.histories.length - 1]?.status?.display,
            },
            createProTableColumnActions<Encounter>({
              keyIndex: "id",
              actions: [
                {
                  icon: <IconStethoscope />,
                  label: "Lakukan Pemeriksaan",
                  onClick(row) {
                    navigate("/diagnose/" + row.id);
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
                  const val = event.currentTarget.value;
                  if (_.isEmpty(val)) {
                    paginateQuery.delete("filter.patient.fullName");
                  } else {
                    paginateQuery.set(
                      "filter.patient.fullName",
                      "$ilike:" + val,
                    );
                  }
                }}
              />
              <SelectEncounterStatus
                query={{
                  "filter.order": "$gt:1",
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
                    paginateQuery.delete("filter.createdAt");
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
