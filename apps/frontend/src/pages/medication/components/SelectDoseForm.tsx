import { useGetDoseFormsQuery } from "@/services/api/dose-form";
import { Select } from "@mantine/core";
import { useMemo } from "react";

interface SelectDoseFormProps {
  value?: null | number;
  defaultValue?: number;
  onChange: (value: null | number) => void;
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
      value: row.id.toString(),
      label: row.display,
    }));
  }, [data]);

  return (
    <Select
      label="Dose Form"
      placeholder="Select dose form"
      data={options}
      value={value ? value.toString() : undefined}
      defaultValue={defaultValue ? defaultValue.toString() : undefined}
      onChange={(v) => onChange(v ? parseInt(v) : null)}
    />
  );
};
