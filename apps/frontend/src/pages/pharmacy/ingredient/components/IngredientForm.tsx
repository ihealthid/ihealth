import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Ingredient } from "@/services/api/ingredient";

interface IngredientFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Ingredient;
}

export const IngredientForm = ({ form, defaultData }: IngredientFormProps) => {
  return (
    <>
      <TextInput
        {...form.getInputProps("name")}
        defaultValue={defaultData?.name}
        label="Name"
        placeholder="Enter name"
      />
    </>
  );
};
