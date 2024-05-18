import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { HealthcareServiceForm } from "./HealthcareServiceForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateHealthcareServiceMutation } from "@/services/api/healthcare-service";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Healthcare Service</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateHealthcareServiceMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <HealthcareServiceForm form={form} />
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
