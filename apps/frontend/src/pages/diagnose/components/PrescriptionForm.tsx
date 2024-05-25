import {
  Stack,
  NumberInput,
  Textarea,
  Flex,
  Button,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { SelectMedication } from "@/features/SelectMedication";
import { FormProvider } from "@/components/form-provider";
import { useCreatePrescriptionItemMutation } from "@/services/api/prescription-item";

const FREQUENCY_OPTIONS = Object.freeze(["daily", "week", "month"]);

export const PrescriptionForm = ({
  onReset,
  encounterId,
}: {
  encounterId: string;
  onReset(): void;
}) => {
  return (
    <FormProvider
      useMutate={useCreatePrescriptionItemMutation}
      initialValues={{
        encounterId,
      }}
      onSuccess={onReset}
    >
      {(form) => (
        <Stack>
          <SelectMedication
            onChange={(e) => e && form.setFieldValue("medicationId", e)}
          />
          <SimpleGrid cols={3}>
            <NumberInput
              {...form.getInputProps("quantity")}
              label="Quantity"
              placeholder="Enter quantity"
            />
            <NumberInput
              {...form.getInputProps("doses")}
              label="Doses"
              placeholder="Enter doses"
            />
            <Select
              {...form.getInputProps("frequency")}
              label="Frequency"
              placeholder="Select Frequency"
              defaultValue={FREQUENCY_OPTIONS[0]}
              data={FREQUENCY_OPTIONS}
            />
          </SimpleGrid>
          <Textarea {...form.getInputProps("note")} label="Note" />

          <Flex gap={16} justify="end">
            <Button variant="subtle" type="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="submit">Add</Button>
          </Flex>
        </Stack>
      )}
    </FormProvider>
  );
};
