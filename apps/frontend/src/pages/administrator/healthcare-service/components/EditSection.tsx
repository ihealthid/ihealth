import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { HealthcareServiceForm } from "./HealthcareServiceForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { useLazyGetHealthcareServiceQuery, useUpdateHealthcareServiceMutation } from "@/services/api/healthcare-service";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetHealthcareServiceQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        open();
        fetcher(id);
        setId(id);
      },
      close,
    }));

    return (
      <Modal
        title={<Title order={4}>Edit Healthcare Service</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateHealthcareServiceMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <HealthcareServiceForm form={form} defaultData={data?.data} />
                <Flex justify="end">
                  <Button type="submit">Save</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  }
);
