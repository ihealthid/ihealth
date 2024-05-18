import { FormProvider } from "@/components/form-provider";
import { DisclosureAction } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { EncounterStatusForm } from "./EncounterStatusForm";
import { useCreateEncounterStatusMutation } from "@/services/api/encounter-status";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add New Encounter Status</Title>}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateEncounterStatusMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <EncounterStatusForm form={form} />
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
