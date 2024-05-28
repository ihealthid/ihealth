import {
  Badge,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Popover,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconBox, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";
import {
  Consumable,
  useDeleteConsumableMutation,
  useGetConsumablesQuery,
} from "@/services/api/consumable";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

export const Component = () => {
  const navigate = useNavigate();
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);
  const [deleteMutation] = useDeleteConsumableMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Consumable</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add Consumable
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetConsumablesQuery}
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
                header: "Barcode",
                render: (row) =>
                  row.barcode && (
                    <Popover>
                      <Popover.Target>
                        <Badge>{row.barcode}</Badge>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Barcode value={row.barcode} displayValue={false} />
                      </Popover.Dropdown>
                    </Popover>
                  ),
              },
              {
                keyIndex: "registeredId",
                header: "AKD/AKL",
              },
              {
                keyIndex: "name",
                header: "Name",
              },
              {
                keyIndex: "variant",
                header: "Variant",
              },
              {
                keyIndex: "price",
                header: "Price",
              },
              {
                keyIndex: "brand.name",
                header: "Brand",
              },
              createProTableColumnActions<Consumable>({
                keyIndex: "id",
                actions: [
                  {
                    icon: <IconBox />,
                    label: "Item",
                    onClick(row) {
                      navigate(`/consumable/${row.id}/stock`);
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
                      deleteConfirmation("Delete Brand", () =>
                        deleteMutation(row.id),
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
