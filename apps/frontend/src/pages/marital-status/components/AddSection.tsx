import { FormProvider } from "@/components/form-provider";
import { DisclosureAction } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { MaritalStatusForm } from "./MaritalStatusForm";
import { useCreateMaritalStatusMutation } from "@/services/api/marital-status";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add New Marital Status</Title>}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateMaritalStatusMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <MaritalStatusForm form={form} />
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
