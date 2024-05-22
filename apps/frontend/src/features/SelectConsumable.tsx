import { useGetConsumablesQuery } from "@/services/api/consumable";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectConsumableProps extends Omit<SelectProps, "data"> {}

export const SelectConsumable = (props: SelectConsumableProps) => {
  const { data } = useGetConsumablesQuery({});

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.name,
      value: row.id,
    }));
  }, [data]);

  return (
    <Select
      {...props}
      placeholder="Select consumable"
      label="Consumable"
      data={options}
    />
  );
};
