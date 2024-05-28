import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetDistributorsQuery } from "@/services/api/distributor";
import { Select, SelectProps } from "@mantine/core";

interface SelectDistributorProps extends Omit<SelectProps, "data"> {}

export const SelectDistributor = (props: SelectDistributorProps) => {
  const { data } = useGetDistributorsQuery({
    page: 1,
    limit: 1000,
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

  return (
    <Select
      {...props}
      label="Distributor"
      placeholder="Select distributor"
      data={options}
    />
  );
};
