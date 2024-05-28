import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetIngredientsQuery } from "@/services/api/ingredient";
import { Select, SelectProps } from "@mantine/core";

interface SelectIngredientProps extends Omit<SelectProps, "data"> {}

export const SelectIngredient = (props: SelectIngredientProps) => {
  const { data } = useGetIngredientsQuery({
    page: 1,
    limit: 1000,
  });

  const options = useCreateSelectOptions(data?.data, "name", "id");

  return (
    <Select
      {...props}
      label="Ingredient"
      placeholder="Select ingredient"
      data={options}
    />
  );
};
