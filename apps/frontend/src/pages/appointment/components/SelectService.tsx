import { useGetClinicServicesQuery } from "@/services/api/clinical-service";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectServiceProps extends Omit<SelectProps, "onChange" | "data"> {
  onChange?: (id: number | null) => void;
}

export const SelectService = ({ onChange, ...props }: SelectServiceProps) => {
  const { data } = useGetClinicServicesQuery({
    page: 1,
    limit: 20,
  });

  const options = useMemo(
    () =>
      data
        ? data.data.map((item) => ({
            value: item.id.toString(),
            label: item.name,
          }))
        : [],
    [data]
  );

  return (
    <Select
      {...props}
      label="Layanan Klinik"
      placeholder="Pilih layanan klinik"
      data={options}
      onChange={(e) => onChange?.(e ? Number.parseInt(e) : null)}
    />
  );
};
