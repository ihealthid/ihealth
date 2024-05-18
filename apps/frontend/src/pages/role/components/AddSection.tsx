import { FormProvider } from "@/components/form-provider";
import { usePostRoleMutation } from "@/services/api/role";
import { Button, Flex, Modal, ModalBody, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { RoleForm } from "./RoleForm";
import { DisclosureAction } from "@/types/disclosure";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add New Role</Title>}
    >
      <ModalBody>
        <FormProvider useMutate={usePostRoleMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <RoleForm form={form} />
              <Flex justify="end">
                <Button type="submit">Save</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </ModalBody>
    </Modal>
  );
});
