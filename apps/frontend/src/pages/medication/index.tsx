import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  NumberFormatter,
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
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";

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
                    label: "Delete",
                    onClick(row) {
                      deleteConfirmation("Delete Medication", () =>
                        deleteMedication(row.id),
                      );
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
