import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetPatientConditionsQuery } from "@/services/api/patient-condition";
import { Select, SelectProps } from "@mantine/core";

interface SelectPatientConditionProps extends Omit<SelectProps, "data"> {}

export const SelectPatientCondition = (props: SelectPatientConditionProps) => {
  const { data } = useGetPatientConditionsQuery({
    page: 1,
    limit: 50,
  });

  const options = useCreateSelectOptions(data?.data, "display", "id");

  return (
    <Select
      {...props}
      data={options}
      label="Patient Condition"
      placeholder="Select patient condition"
    />
  );
};
