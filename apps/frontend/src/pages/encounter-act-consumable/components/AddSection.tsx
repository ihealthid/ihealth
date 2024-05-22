import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { EncounterActConsumableForm } from "./EncounterActConsumableForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateEncounterActConsumableMutation } from "@/services/api/encounter-act-consumable";
import { useParams } from "react-router-dom";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const params = useParams();
  const encounterActId = params.encounterActId as string;

  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Encounter Act Consumable</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateEncounterActConsumableMutation}
          initialValues={{ encounterActId }}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <EncounterActConsumableForm form={form} />
              <Flex justify="end">
                <Button type="submit">Save</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
