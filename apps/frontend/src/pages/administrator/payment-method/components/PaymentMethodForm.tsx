import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface PaymentMethodFormProps<T> {
  form: UseFormReturnType<T>;
  defaultData?: Record<string, any>;
}

export const PaymentMethodForm = <T,>({
  form,
  defaultData,
}: PaymentMethodFormProps<T>) => {
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
    </>
  );
};
