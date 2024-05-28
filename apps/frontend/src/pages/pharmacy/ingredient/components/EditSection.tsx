import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IngredientForm } from "./IngredientForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import {
  useLazyGetIngredientQuery,
  useUpdateIngredientMutation,
} from "@/services/api/ingredient";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();

    const [fetcher, { data }] = useLazyGetIngredientQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        open();
        setId(id);
        fetcher(id);
      },
      close,
    }));

    return (
      <Modal
        title={<Title order={4}>Edit Ingredient</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateIngredientMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <IngredientForm form={form} defaultData={data?.data} />
                <Flex justify="end" mt={16}>
                  <Button type="submit">Save</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  },
);
