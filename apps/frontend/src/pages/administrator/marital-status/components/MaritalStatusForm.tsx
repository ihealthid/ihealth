import { TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface MaritalStatusFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Record<string, any>;
}

export const MaritalStatusForm = ({
  form,
  defaultData,
}: MaritalStatusFormProps) => {
  return (
    <>
      <TextInput
        {...form.getInputProps("system")}
        label="System"
        placeholder="Enter system"
        defaultValue={defaultData?.system}
      />
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
      <Textarea
        {...form.getInputProps("definition")}
        label="Definition"
        placeholder="Enter definition"
        defaultValue={defaultData?.definition}
      />
    </>
  );
};
