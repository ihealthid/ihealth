import { Button, Card, CardSection, Flex, Text, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { modals } from "@mantine/modals";
import {
  PaymentMethod,
  useDeletePaymentMethodMutation,
  useGetPaymentMethodsQuery,
} from "@/services/api/payment-method";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);

  const [deleteMutation] = useDeletePaymentMethodMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Jenis Pembayaran</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Tambah Baru
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetPaymentMethodsQuery}
            cols={[
              {
                keyIndex: "code",
                header: "Code",
              },
              {
                keyIndex: "display",
                header: "Display",
              },
              createProTableColumnActions<PaymentMethod>({
                actions: [
                  {
                    icon: <IconEdit />,
                    label: "Edit",
                    onClick(row) {
                      editSectionRef.current?.open(row.id);
                    },
                  },
                  {
                    icon: <IconTrash />,
                    label: "Delete",
                    onClick(row) {
                      modals.openConfirmModal({
                        title: (
                          <Title order={4}>Hapus Jenis Pembayaran</Title>
                        ),
                        children: <Text>Apa anda yakin?</Text>,
                        onConfirm() {
                          deleteMutation(row.id);
                        },
                      });
                    },
                  },
                ],
              }),
            ]}
          />
        </CardSection>
      </Card>

      <AddSection ref={addSectionRef} />
      <EditSection ref={editSectionRef} />
    </>
  );
};
