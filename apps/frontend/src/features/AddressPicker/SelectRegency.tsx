import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetRegenciesQuery } from "@/services/api/area";
import { Select, SelectProps } from "@mantine/core";

export const SelectRegency = ({
  provinceId,
  ...props
}: SelectProps & { provinceId?: string | null }) => {
  const { data } = useGetRegenciesQuery({
    page: 1,
    limit: 1000,
    sortBy: "name:ASc",
    "filter.provinceId": "$eq:" + provinceId,
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

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
