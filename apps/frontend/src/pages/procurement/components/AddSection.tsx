import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { ProcurementForm } from "./ProcurementForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateProcurementMutation } from "@/services/api/procurement";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Procurement</Title>}
      opened={opened}
      onClose={close}
      fullScreen
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateProcurementMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <ProcurementForm form={form} />
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
