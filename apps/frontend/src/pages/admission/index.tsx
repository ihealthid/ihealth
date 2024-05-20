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
import { useRef } from "react";
import { AddSection } from "./components/AddSection";
import { IconPlus } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { ProTable } from "@/components/ProTable";
import { useGetEncountersQuery } from "@/services/api/encounter";
import dayjs from "dayjs";
import { DisclosureAction } from "@/types/disclosure";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);

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
          queryParams={{
            "createdAt:dateAt": dayjs().format("YYYY-MM-DD"),
          }}
          headerSection={(filter) => (
            <Group p="md">
              <TextInput
                placeholder="Pencarian"
                onChange={(event) => {
                  filter({
                    "patient.fullName:iLike": event.currentTarget.value,
                  });
                }}
              />
              <SelectEncounterStatus
                onChange={(val) => {
                  filter({
                    "histories.status:in": val.join(":"),
                  });
                }}
              />
              <DateInput
                clearable
                placeholder="Tanggal"
                onChange={(val) => {
                  if (val) {
                    filter({
                      "createdAt:dateAt": dayjs(val).format("YYYY-MM-DD"),
                    });
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
          ]}
        />
      </CardSection>
      <AddSection ref={addSectionRef} />
    </Card>
  );
};
