import { FormProvider } from "@/components/form-provider";
import { useCreatePatientAllergyMutation } from "@/services/api/allergy";
import { DisclosureAction } from "@/types/disclosure";
import {
  Alert,
  Autocomplete,
  Button,
  Flex,
  List,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle } from "react";

interface FormAddProps {
  encounterId: string;
}

export const FormAdd = forwardRef<DisclosureAction, FormAddProps>(
  ({ encounterId }, ref) => {
    const [opened, { open, close }] = useDisclosure();

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Tambah Alergi</Title>}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useCreatePatientAllergyMutation}
            initialValues={{ encounterId, name: "", level: 1 }}
            onSuccess={close}
          >
            {(form) => (
              <Stack>
                <Alert icon={<IconInfoCircle />}>
                  <Stack>
                    <Stack gap={6}>
                      <Text fw={500} fz={12}>
                        Alergi
                      </Text>
                      <Text fz={12}>
                        Faktor yang memicu timbulnya alergi baik makanan,
                        minuman, benda atau kegiatan. Contoh: Udang, Dingin,
                        Bulu Kucing
                      </Text>
                    </Stack>
                    <Stack gap={6}>
                      <Text fw={500} fz={12}>
                        Level
                      </Text>
                      <List type="ordered" fz={12}>
                        <List.Item>
                          Anafilatik ringan berupa rasa gatal
                        </List.Item>
                        <List.Item>
                          Reaksi alergi yang muncul disertai rasa mual
                        </List.Item>
                        <List.Item>
                          Penderita alergi sudah mulai muntah
                        </List.Item>
                        <List.Item>
                          Penderita mengalami gagal jantung, tensi tak terukur,
                          hingga tak bisa bernafas
                        </List.Item>
                      </List>
                      <Text fz={12}>
                        Reaksi pada tingkat dua dan tiga biasanya disertai
                        bengkak, kemerahan, atau batuk
                      </Text>
                    </Stack>
                  </Stack>
                </Alert>
                <Autocomplete {...form.getInputProps("name")} label="Alergi" />
                <Select
                  label="Level"
                  data={["1", "2", "3", "4"]}
                  onChange={(e) =>
                    e && form.setFieldValue("level", parseInt(e))
                  }
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
  },
);
