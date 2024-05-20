import { useGetFormTypesQuery } from "@/services/api/form-type";
import { Select } from "@mantine/core";
import { useMemo } from "react";

interface SelectFormTypeProps {
  defaultValue?: string | null;
  onChange: (value?: string | null) => void;
}

export const SelectFormType = ({
  defaultValue,
  onChange,
}: SelectFormTypeProps) => {
  const { data } = useGetFormTypesQuery({
    page: 1,
    limit: 1000,
  });

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.display,
      value: row.id,
    }));
  }, [data]);

  return (
    <Select
      label="Form Type"
      placeholder="Select form type"
      data={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
