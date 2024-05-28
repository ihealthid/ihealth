import { FormProvider } from "@/components/form-provider";
import { usePostMedicationMutation } from "@/services/api/medication";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { ManufactureForm } from "./ManufactureForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateManufactureMutation } from "@/services/api/manufacture";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Manufacture</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateManufactureMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <ManufactureForm form={form} />
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
