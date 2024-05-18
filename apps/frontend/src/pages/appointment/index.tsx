import {
  Badge,
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { AppointmentTableRef } from "./components/AppointmentTable";
import { useRef } from "react";
import { DateInput } from "@mantine/dates";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { Encounter, useGetEncountersQuery } from "@/services/api/encounter";
import { IconStethoscope } from "@tabler/icons-react";
import { SelectEncounterStatus } from "@/features/SelectEncounterStatus";
import { useNavigate } from "react-router-dom";
import { today } from "@/utils/date";

export const Component = () => {
  const visitListTableRef = useRef<AppointmentTableRef>(null);
  const navigate = useNavigate();

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title order={4}>Daftar Pertemuan</Title>
      </Flex>

      <CardSection>
        <ProTable
          queryLoader={useGetEncountersQuery}
          queryParams={{
            // filter: ["status.order.gt|1"],
            "createdAt:dateAt": today(),
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
          headerSection={(setter) => (
            <Group p="md">
              <TextInput
                placeholder="Pencarian"
                onChange={(event) =>
                  setter({
                    "patient.fullName:iLike": event.currentTarget.value,
                  })
                }
              />
              <SelectEncounterStatus
                filter={["order.gt|1"]}
                onChange={(val) =>
                  visitListTableRef.current?.setStatus(
                    val.length > 0 ? val : ["screened"]
                  )
                }
              />
              <DateInput
                clearable
                placeholder="Tanggal"
                onChange={(val) => visitListTableRef.current?.setDate(val)}
              />
            </Group>
          )}
        />
      </CardSection>
    </Card>
  );
};
