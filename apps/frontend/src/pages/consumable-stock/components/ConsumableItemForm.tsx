import { NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { PackagingInput } from "./PackagingInput";

interface ConsumableItemFormProps {
  form: UseFormReturnType<any>;
}

export const ConsumableItemForm = ({ form }: ConsumableItemFormProps) => {
  return (
    <>
      <NumberInput
        {...form.getInputProps("price")}
        thousandSeparator
        label="Price"
        placeholder="Enter price"
      />
      <DateInput
        {...form.getInputProps("expiredAt")}
        label="Expired Date"
        placeholder="Pick expired date"
      />
      <PackagingInput
        onChange={(val) => form.setFieldValue("packaging", val)}
      />
    </>
  );
};
