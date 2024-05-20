import { useGetHealthcareServicesQuery } from "@/services/api/healthcare-service";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectServiceProps extends Omit<SelectProps, "data"> {}

export const SelectService = (props: SelectServiceProps) => {
  const { data } = useGetHealthcareServicesQuery({
    page: 1,
    limit: 20,
  });

  const options = useMemo(
    () =>
      data
        ? data.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        : [],
    [data],
  );

  return (
    <Select
      {...props}
      label="Healthcare Service"
      placeholder="Select healthcare service"
      data={options}
    />
  );
};
