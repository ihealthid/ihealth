import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import {
  Manufacture,
  useDeleteManufactureMutation,
  useGetManufacturesQuery,
} from "@/services/api/manufacture";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteMutation] = useDeleteManufactureMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Manufacture</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add Manufacture
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetManufacturesQuery}
            headerSection={(filter) => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    filter({
                      "name:iLike": e.currentTarget.value,
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
              createProTableColumnActions<Manufacture>({
                keyIndex: "id",
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
                      deleteConfirmation("Delete Manufacture", () =>
                        deleteMutation(row.id)
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
