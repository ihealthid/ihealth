import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { DistributorForm } from "./DistributorForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateDistributorMutation } from "@/services/api/distributor";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Distributor</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider useMutate={useCreateDistributorMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <DistributorForm form={form} />
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
