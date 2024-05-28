import { FormProvider } from "@/components/form-provider";
import { usePostImportClassificationDiseaseMutation } from "@/services/api/classification-disease";
import { Button, FileInput, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";

export interface AddSectionRef {
  open: () => void;
  close: () => void;
}

export const AddSection = forwardRef<AddSectionRef>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Import Klasifikasi Penyakit</Title>}
    >
      <Modal.Body>
        <FormProvider
          useMutate={usePostImportClassificationDiseaseMutation}
          encType="multipart/form-data"
        >
          {(form) => (
            <Stack>
              <FileInput label="Pilih Berkas" {...form.getInputProps("file")} />

              <Flex justify="end">
                <Button type="submit">Import</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
