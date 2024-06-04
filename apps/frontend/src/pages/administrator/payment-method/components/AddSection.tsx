import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { DisclosureAction } from "@/types/disclosure";
import { useCreatePaymentMethodMutation } from "@/services/api/payment-method";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Tambah Jenis Pembayaran</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreatePaymentMethodMutation}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <PaymentMethodForm form={form} />
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
