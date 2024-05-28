import { FormProvider } from "@/components/form-provider";
import { useCreateUserMutation } from "@/services/api/user";
import { Button, Flex, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SelectRole from "./SelectRole";
import { forwardRef, useImperativeHandle } from "react";
import { DisclosureAction } from "@/types/disclosure";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Add New User</Title>}
    >
      <Modal.Body>
        <FormProvider useMutate={useCreateUserMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <TextInput
                {...form.getInputProps("fullName")}
                label="Nama"
                placeholder="Masukan nama"
              />

              <SelectRole
                onChange={(values) => form.setFieldValue("roles", values)}
              />
              <TextInput
                {...form.getInputProps("username")}
                label="Username"
                placeholder="Masukan username"
              />
              <TextInput
                {...form.getInputProps("password")}
                label="Password"
                placeholder="Masukan password"
                type="password"
              />
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
