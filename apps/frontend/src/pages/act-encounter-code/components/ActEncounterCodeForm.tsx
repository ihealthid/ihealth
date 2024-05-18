import { TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface ActEncounterCodeFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Record<string, any>;
}

export const ActEncounterCodeForm = ({
  form,
  defaultData,
}: ActEncounterCodeFormProps) => {
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
      <Textarea
        {...form.getInputProps("definition")}
        label="Definition"
        placeholder="Enter definition"
        defaultValue={defaultData?.definition}
      />
    </>
  );
};
