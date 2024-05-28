import { SelectConsumable } from "@/features/SelectConsumable";
import { NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface EncounterActConsumableFormProps<T> {
  form: UseFormReturnType<T>;
  defaultData?: Record<string, any>;
}

export const EncounterActConsumableForm = <T,>({
  form,
  defaultData,
}: EncounterActConsumableFormProps<T>) => {
  return (
    <>
      <SelectConsumable {...form.getInputProps("consumableId")} />
      <NumberInput
        {...form.getInputProps("quantity")}
        label="Quantity"
        placeholder="Enter quantity"
        defaultValue={defaultData?.quantity}
      />
    </>
  );
};
