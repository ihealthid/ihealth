import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { IngredientForm } from "./IngredientForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateIngredientMutation } from "@/services/api/ingredient";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Ingredient</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider useMutate={useCreateIngredientMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <IngredientForm form={form} />
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
