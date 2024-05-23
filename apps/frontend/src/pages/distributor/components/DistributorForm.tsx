import { Brand } from "@/services/api/brand";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface BrandFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Brand;
}

export const BrandForm = ({ form, defaultData }: BrandFormProps) => {
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
