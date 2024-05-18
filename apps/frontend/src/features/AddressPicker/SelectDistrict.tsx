import { useGetDistrictsQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

export const SelectDistrict = ({
  regencyId,
  ...props
}: SelectProps & { regencyId?: string | null }) => {
  const { data } = useGetDistrictsQuery({
    regencyId,
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

  return regencyId ? (
    <Select
      {...props}
      searchable
      label="Kecamatan"
      placeholder="Pilih kecamatan"
      data={options}
    />
  ) : null;
};
