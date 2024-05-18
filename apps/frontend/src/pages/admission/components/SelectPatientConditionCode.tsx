import { useGetPatientConditionsQuery } from "@/services/api/patient-condition";
import { Select, SelectProps } from "@mantine/core";

interface SelectPatientConditionCodeProps extends Omit<SelectProps, "data"> {}

export const SelectPatientConditionCode = (
  props: SelectPatientConditionCodeProps
) => {
  const { data } = useGetPatientConditionsQuery({
    page: 1,
    limit: 50,
  });

  const options = data
    ? data.data.map((item) => ({
        value: item.id.toString(),
        label: item.display,
      }))
    : [];

  return (
    <Select
      {...props}
      data={options}
      label="Patient Condition"
      placeholder="Select patient condition"
    />
  );
};
