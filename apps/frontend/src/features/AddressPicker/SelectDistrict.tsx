import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetDistrictsQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";

export const SelectDistrict = ({
  regencyId,
  ...props
}: SelectProps & { regencyId?: string | null }) => {
  const { data } = useGetDistrictsQuery({
    page: 1,
    limit: 1000,
    sortBy: "name:ASC",
    "filter.regencyId": "$eq:" + regencyId,
  });
  const options = useCreateSelectOptions(data?.data, "name", "id");

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
