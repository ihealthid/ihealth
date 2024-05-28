import { FormProvider } from "@/components/form-provider";
import { DisclosureAction } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { ParticipantTypeCodeForm } from "./ParticipantTypeCodeForm";
import { useCreateParticipantTypeCodeMutation } from "@/services/api/participant-type-code";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add New Participant Type Code</Title>}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateParticipantTypeCodeMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <ParticipantTypeCodeForm form={form} />
              <Flex justify="end">
                <Button type="submit">Simpan</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
