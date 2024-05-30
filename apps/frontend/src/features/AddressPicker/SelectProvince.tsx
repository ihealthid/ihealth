import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetProvincesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";

export const SelectProvince = (props: SelectProps) => {
  const { data } = useGetProvincesQuery({
    page: 1,
    limit: 100,
    sortBy: "name:ASC",
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

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
