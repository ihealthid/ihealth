import { Group, NumberInput, Radio, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectBrand } from "./SelectBrand";
import { SelectFormType } from "./SelectFormType";
import { Consumable } from "@/services/api/consumable";

interface ConsumableFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Consumable;
}

export const ConsumableForm = ({ form, defaultData }: ConsumableFormProps) => {
  return (
    <>
      <SelectBrand
        defaultValue={defaultData?.brandId}
        onChange={(e) => form.setFieldValue("brandId", e)}
      />
      <SelectFormType
        defaultValue={defaultData?.formTypeId}
        onChange={(e) => form.setFieldValue("formTypeId", e)}
      />
      <TextInput
        {...form.getInputProps("barcode")}
        defaultValue={defaultData?.barcode}
        label="Barcode"
        placeholder="Enter barcode"
      />
      <TextInput
        {...form.getInputProps("registeredId")}
        defaultValue={defaultData?.registeredId}
        label="AKL/AKD"
        placeholder="Enter AKL/AKD"
      />
      <TextInput
        {...form.getInputProps("name")}
        defaultValue={defaultData?.name}
        label="Name"
        placeholder="Enter name"
      />
      <TextInput
        {...form.getInputProps("variant")}
        defaultValue={defaultData?.variant}
        label="Variant"
        placeholder="Enter variant"
      />
      <NumberInput
        {...form.getInputProps("price")}
        thousandSeparator
        defaultValue={defaultData?.price}
        label="Price"
        placeholder="Enter price"
      />
      <Radio.Group
        onChange={(e) => form.setFieldValue("isImported", e === "1")}
        label="Product Import"
      >
        <Group>
          <Radio value={"1"} label="Yes" />
          <Radio value={"0"} label="No" />
        </Group>
      </Radio.Group>
    </>
  );
};
