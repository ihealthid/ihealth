import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { ConsumableItemForm } from "./ConsumableItemForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreateConsumableStockMutation } from "@/services/api/consumable-stock";
import { useParams } from "react-router-dom";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();
  const params = useParams();
  const consumableId = parseInt(params.id!);
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Add New Stock</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateConsumableStockMutation}
          initialValues={{
            consumableId,
          }}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <ConsumableItemForm form={form} />
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
