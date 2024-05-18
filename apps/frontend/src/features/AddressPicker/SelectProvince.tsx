import { useGetProvincesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

export const SelectProvince = (props: SelectProps) => {
  const { data } = useGetProvincesQuery({
    page: 1,
    limit: 100,
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
  return (
    <Select
      {...props}
      searchable
      label="Provinsi"
      placeholder="Pilih provinsi"
      data={options}
    />
  );
};
