import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetHealthcareServicesQuery } from "@/services/api/healthcare-service";
import { Select, SelectProps } from "@mantine/core";

interface SelectServiceProps extends Omit<SelectProps, "data"> {}

export const SelectService = (props: SelectServiceProps) => {
  const { data } = useGetHealthcareServicesQuery({
    page: 1,
    limit: 20,
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

  return (
    <Select
      {...props}
      label="Healthcare Service"
      placeholder="Select healthcare service"
      data={options}
    />
  );
};
