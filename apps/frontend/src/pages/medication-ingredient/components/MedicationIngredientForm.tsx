import { NumberInput, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectIngredient } from "./SelectIngredient";
import { MedicationIngredient } from "@/services/api/medication-ingredient";

interface MedicationIngredientFormProps {
  form: UseFormReturnType<any>;
  defaultData?: MedicationIngredient;
}

export const MedicationIngredientForm = ({
  form,
  defaultData,
}: MedicationIngredientFormProps) => {
  return (
    <>
      <SelectIngredient
        defaultValue={defaultData?.ingredientId}
        onChange={(e) => form.setFieldValue("ingredientId", e)}
      />
      <NumberInput
        {...form.getInputProps("quantity")}
        defaultValue={defaultData?.quantity}
        label="Quantity (mg)"
        placeholder="Enter quantity"
      />
      <Select
        {...form.getInputProps("unit")}
        label="Unit"
        placeholder="Select unit"
        data={["mg", "percent"]}
      />
    </>
  );
};
