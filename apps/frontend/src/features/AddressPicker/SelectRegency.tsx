import { useGetRegenciesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

export const SelectRegency = ({
  provinceId,
  ...props
}: SelectProps & { provinceId?: string | null }) => {
  const { data } = useGetRegenciesQuery({
    provinceId,
    page: 1,
    limit: 1000,
    sort: ["name:asc"],
  });
  const options = useMemo(
    () =>
      data
        ? data.data.map((row) => ({
            value: row.id,
            label: row.name,
          }))
        : [],
    [data]
  );
  return provinceId ? (
    <Select
      {...props}
      searchable
      label="Regency"
      placeholder="Select regency"
      data={options}
    />
  ) : null;
};
