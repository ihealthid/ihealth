import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { MedicationIngredientForm } from "./MedicationIngredientForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateMedicationIngredientMutation } from "@/services/api/medication-ingredient";
import { useParams } from "react-router-dom";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const params = useParams();
  const medicationId = params.medicationId as string;
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add Ingredient</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateMedicationIngredientMutation}
          initialValues={{
            medicationId,
          }}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <MedicationIngredientForm form={form} />
              <Flex justify="end" mt={16}>
                <Button type="submit">Save</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
