import { Select, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectParticipantTypeCode } from "./SelectParticipantTypeCode";

interface ParticipantTypeCodeFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Record<string, any>;
}

export const ParticipantTypeCodeForm = ({
  form,
  defaultData,
}: ParticipantTypeCodeFormProps) => {
  return (
    <>
      <TextInput
        {...form.getInputProps("system")}
        label="System"
        placeholder="Enter system"
        name="system"
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
      <Select
        label="Status"
        placeholder="Select status"
        data={[
          {
            label: "Active",
            value: "active",
          },
        ]}
        defaultValue="active"
        onChange={(e) => form.setFieldValue("status", e)}
      />
      <SelectParticipantTypeCode
        onChange={(e) => form.setFieldValue("parentId", e)}
      />
    </>
  );
};
