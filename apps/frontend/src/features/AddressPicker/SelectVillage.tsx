import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetVillagesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";

export const SelectVillage = ({
  districtId,
  ...props
}: SelectProps & { districtId?: string | null }) => {
  const { data } = useGetVillagesQuery({
    page: 1,
    limit: 1000,
    sortBy: "name:ASC",
    "filter.districtId": "$eq:" + districtId,
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

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
