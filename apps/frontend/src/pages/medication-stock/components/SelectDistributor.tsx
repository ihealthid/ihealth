import { useGetDistributorsQuery } from "@/services/api/distributor";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectDistributorProps extends Omit<SelectProps, "data"> {}

export const SelectDistributor = (props: SelectDistributorProps) => {
  const { data } = useGetDistributorsQuery({});

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.name,
      value: row.id,
    }));
  }, [data]);

  return (
    <Select
      {...props}
      label="Distributor"
      placeholder="Select distributor"
      data={options}
    />
  );
};
