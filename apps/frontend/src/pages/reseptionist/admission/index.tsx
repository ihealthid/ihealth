import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { SelectEncounterStatus } from "../../features/SelectEncounterStatus";
import { useEffect, useRef } from "react";
import { AddSection } from "./components/AddSection";
import { IconPlus } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { ProTable } from "@/components/ProTable";
import { useGetEncountersQuery } from "@/services/api/encounter";
import { DisclosureAction } from "@/types/disclosure";
import { generateBetweenDateFilter } from "@/utils/generateBetweenDateFilter";
import _ from "lodash";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);

  const paginateQuery = usePaginateQuery();

  useEffect(() => {
    paginateQuery.set("filter.createdAt", generateBetweenDateFilter());
  }, []);

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title order={4}>Pendaftaran</Title>
        <Button
          leftSection={<IconPlus />}
          onClick={() => addSectionRef.current?.open()}
        >
          Tambah
        </Button>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          query={paginateQuery.get()}
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
          cols={[
            {
              keyIndex: "patient.fullName",
              header: "Pasien",
            },
            {
              keyIndex: "healthcareService.name",
              header: "Kunjungan",
            },
            {
              header: "Status",
              render: (row) =>
                row.histories[row.histories.length - 1]?.status?.display,
            },
            {
              keyIndex: "createdAt",
              header: "Created Date",
            },
          ]}
        />
      </CardSection>
      <AddSection ref={addSectionRef} />
    </Card>
  );
};
