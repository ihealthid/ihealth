import { useGetEncounterActsQuery } from "@/services/api/encounter-act";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectActProps extends Omit<SelectProps, "data"> {}

export const SelectAct = (props: SelectActProps) => {
  const { data } = useGetEncounterActsQuery({});

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.display,
      value: row.id,
    }));
  }, [data]);

  return <Select {...props} label="Action" data={options} />;
};
