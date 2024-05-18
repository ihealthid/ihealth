import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { BrandForm } from "./BrandForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateBrandMutation } from "@/services/api/brand";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Brand</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider useMutate={useCreateBrandMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <BrandForm form={form} />
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
