import { useGetBrandsQuery } from "@/services/api/brand";
import { Select } from "@mantine/core";
import { useMemo } from "react";

interface SelectBrandProps {
  defaultValue?: string | null;
  onChange: (value?: string | null) => void;
}

export const SelectBrand = ({ defaultValue, onChange }: SelectBrandProps) => {
  const { data } = useGetBrandsQuery({
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
      label="Brand"
      placeholder="Select brand"
      data={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
