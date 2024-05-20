import { useGetDoseFormsQuery } from "@/services/api/dose-form";
import { Select } from "@mantine/core";
import { useMemo } from "react";

interface SelectDoseFormProps {
  value?: null | string;
  defaultValue?: string;
  onChange: (value: null | string) => void;
}

export const SelectDoseForm = ({
  value,
  defaultValue,
  onChange,
}: SelectDoseFormProps) => {
  const { data } = useGetDoseFormsQuery({
    page: 1,
    limit: 100,
  });

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      value: row.id,
      label: row.display,
    }));
  }, [data]);

  return (
    <Select
      label="Dose Form"
      placeholder="Select dose form"
      data={options}
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={onChange}
    />
  );
};
