import { useGetVillagesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

export const SelectVillage = ({
  districtId,
  ...props
}: SelectProps & { districtId?: string | null }) => {
  const { data } = useGetVillagesQuery({
    districtId,
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
  return districtId ? (
    <Select
      {...props}
      searchable
      label="Desa"
      placeholder="Pilih desa"
      data={options}
    />
  ) : null;
};
