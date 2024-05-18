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
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Enter name"
        defaultValue={defaultData?.name}
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
