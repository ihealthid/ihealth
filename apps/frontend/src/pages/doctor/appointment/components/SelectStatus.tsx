import { MultiSelect, MultiSelectProps } from "@mantine/core";

const statuses = [
  {
    label: "Menunggu",
    value: "screened",
    selected: true,
  },
  {
    label: "Sedang Diperiksa",
    value: "checking",
  },
  {
    label: "Selesai Diperiksa",
    value: "diagnosed",
  },
];

export const SelectStatus = (props: MultiSelectProps) => {
  return (
    <MultiSelect
      hidePickedOptions
      {...props}
      placeholder="Status"
      data={statuses}
    />
  );
};
