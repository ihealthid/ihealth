import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  NumberFormatter,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconBox, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  Medication,
  useDeleteMedicationMutation,
  useGetMedicationsQuery,
} from "@/services/api/medication";
import { useNavigate } from "react-router-dom";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { modals } from "@mantine/modals";
import { EditSection } from "./components/EditSection";

export const Component = () => {
  const navigate = useNavigate();
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteMedication] = useDeleteMedicationMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Medication</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetMedicationsQuery}
            headerSection={(filter) => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    filter({
                      "display:iLike": e.currentTarget.value,
                    })
                  }
                />
              </Group>
            )}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "name",
                header: "Nama",
              },
              {
                keyIndex: "bpom",
                header: "BPOM",
              },
              {
                keyIndex: "price",
                header: "Harga",
                render: (row) => (
                  <NumberFormatter value={row.price} thousandSeparator />
                ),
              },
              createProTableColumnActions<Medication>({
                keyIndex: "id",
                actions: [
                  {
                    icon: <IconBox />,
                    label: "Stocks",
                    onClick(row) {
                      navigate(`/medication-stock/${row.id}`);
                    },
                  },
                  {
                    icon: <IconEdit />,
                    label: "Edit",
                    onClick(row) {
                      editSectionRef.current?.open(row.id);
                    },
                  },
                  {
                    icon: <IconTrash />,
                    label: "Hapus",
                    onClick(row) {
                      modals.openConfirmModal({
                        title: <Title order={4}>Hapus Obat</Title>,
                        children: (
                          <Text>
                            Apakah anda yakin akan menghapus Obat ini?
                          </Text>
                        ),
                        onConfirm() {
                          deleteMedication(row.id);
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
