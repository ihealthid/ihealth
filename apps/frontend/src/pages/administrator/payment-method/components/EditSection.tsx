import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import {
  useLazyGetPaymentMethodQuery,
  useUpdatePaymentMethodMutation,
} from "@/services/api/payment-method";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetPaymentMethodQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        fetcher(id).then(() => {
          open();
          setId(id);
        });
      },
      close,
    }));

    return (
      <Modal
        title={<Title order={4}>Edit Jenis Pembayaran</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdatePaymentMethodMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <PaymentMethodForm form={form} defaultData={data?.data} />
                <Flex justify="end">
                  <Button type="submit">Simpan</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  },
);
