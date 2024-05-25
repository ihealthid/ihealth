import { useGetEncounterStatusesQuery } from "@/services/api/encounter-status";
import { MultiSelect, MultiSelectProps, Skeleton } from "@mantine/core";
import { useMemo } from "react";

interface SelectEncounterStatusProps extends Omit<MultiSelectProps, "filter"> {
  query?: {
    [key: string]: string;
  };
}

export const SelectEncounterStatus = ({
  query = {},
  ...props
}: SelectEncounterStatusProps) => {
  const { data, isLoading } = useGetEncounterStatusesQuery(query);

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      value: row.id.toString(),
      label: row.display,
    }));
  }, [data]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <MultiSelect {...props} placeholder="Status" data={options} />
  );
};
