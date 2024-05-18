import { FormProvider } from "@/components/form-provider";
import { DisclosureAction } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { ActEncounterCodeForm } from "./ActEncounterCodeForm";
import { useCreateActEncounterCodeMutation } from "@/services/api/act-encounter-code";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add Act Encounter Code</Title>}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateActEncounterCodeMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <ActEncounterCodeForm form={form} />
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
