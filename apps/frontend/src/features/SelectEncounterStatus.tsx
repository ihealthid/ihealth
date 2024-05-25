import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetEncounterStatusesQuery } from "@/services/api/encounter-status";
import { MultiSelect, MultiSelectProps, Skeleton } from "@mantine/core";

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

  const options = useCreateSelectOptions(data?.data, "display", "id");

  return isLoading ? (
    <Skeleton />
  ) : (
    <MultiSelect {...props} placeholder="Status" data={options} />
  );
};
