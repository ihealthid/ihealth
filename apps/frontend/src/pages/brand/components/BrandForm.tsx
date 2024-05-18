import { Brand } from "@/services/api/brand";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectManufacture } from "./SelectManufacture";

interface BrandFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Brand;
}

export const BrandForm = ({ form, defaultData }: BrandFormProps) => {
  return (
    <>
      <SelectManufacture
        defaultValue={defaultData?.manufactureId}
        onChange={(e) => form.setFieldValue("manufactureId", e)}
      />
      <TextInput
        {...form.getInputProps("name")}
        defaultValue={defaultData?.name}
        label="Name"
        placeholder="Enter name"
      />
    </>
  );
};
