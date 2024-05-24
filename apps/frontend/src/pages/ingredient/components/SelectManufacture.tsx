import { useGetManufacturesQuery } from "@/services/api/manufacture";
import { Select } from "@mantine/core";
import { useMemo } from "react";

interface SelectManufactureProps {
  defaultValue?: string | null;
  onChange: (value?: string | null) => void;
}

export const SelectManufacture = ({
  defaultValue,
  onChange,
}: SelectManufactureProps) => {
  const { data } = useGetManufacturesQuery({
    page: 1,
    limit: 1000,
  });

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.name,
      value: row.id,
    }));
  }, [data]);

  return (
    <Select
      label="Manufacture"
      placeholder="Select manufacture"
      data={options}
      defaultValue={defaultValue?.toString()}
      onChange={onChange}
    />
  );
};
