import { Select, SelectProps } from "@mantine/core";

interface SelectGenderProps extends Omit<SelectProps, "data"> {}

const options = [
  {
    label: "Laki-Laki",
    value: "MALE",
  },
  {
    label: "Perempuan",
    value: "FEMALE",
  },
];

export const SelectGender = (props: SelectGenderProps) => {
  return (
    <Select
      {...props}
      label="Jenis Kelamin"
      placeholder="Masukan jenis kelamin"
      data={options}
    />
  );
};
