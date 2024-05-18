import { useGetScreeningVisualsQuery } from "@/services/api/visual-screening";
import { Select, SelectProps } from "@mantine/core";

interface SelectScreeningVisualProps extends Omit<SelectProps, "data"> {}

export const SelectScreeningVisual = (props: SelectScreeningVisualProps) => {
  const { data } = useGetScreeningVisualsQuery({
    page: 1,
    limit: 50,
  });

  const options = data
    ? data.data.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }))
    : [];

  return (
    <Select
      {...props}
      data={options}
      label="Kondisi Pasien"
      placeholder="Pilih kondisi pasien"
    />
  );
};
