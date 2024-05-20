import { NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface HealthcareServiceFormProps<T> {
  form: UseFormReturnType<T>;
  defaultData?: Record<string, any>;
}

export const HealthcareServiceForm = <T,>({
  form,
  defaultData,
}: HealthcareServiceFormProps<T>) => {
  return (
    <>
      <TextInput
        {...form.getInputProps("code")}
        label="Code"
        placeholder="Enter code"
        defaultValue={defaultData?.code}
      />
      <TextInput
        {...form.getInputProps("display")}
        label="Display"
        placeholder="Enter display"
        defaultValue={defaultData?.display}
      />
      <NumberInput
        {...form.getInputProps("price")}
        thousandSeparator
        label="Price"
        placeholder="Enter price"
        defaultValue={defaultData?.price}
      />
    </>
  );
};
