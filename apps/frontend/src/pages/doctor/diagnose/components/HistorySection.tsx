import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  Encounter,
  useGetEncountersQuery,
  useLazyGetEncounterQuery,
} from "@/services/api/encounter";
import { humanizedDate } from "@/utils/date";
import { Group, Stack } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

interface HistorySectionProps {
  patientId: string;
}

export const HistorySection = ({ patientId }: HistorySectionProps) => {
  const [refetch, { data }] = useLazyGetEncounterQuery();

  return (
    <>
      <Group>
        <Stack style={{ flex: 1 }}>
          <ProTable
            queryLoader={useGetEncountersQuery}
            query={{
              "filter.patientId": "$eq" + patientId,
            }}
            cols={[
              {
                header: "Tanggal",
                render: (row) => humanizedDate(row.createdAt),
              },
              createProTableColumnActions<Encounter>({
                actions: [
                  {
                    icon: <IconEye />,
                    label: "Lihat",
                    onClick: (row) => {
                      refetch(row.id);
                    },
                  },
                ],
              }),
            ]}
          />
        </Stack>

        {data && <Stack style={{ flex: 1 }}></Stack>}
      </Group>
    </>
  );
};
