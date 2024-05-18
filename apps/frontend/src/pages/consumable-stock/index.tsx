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
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction } from "@/types/disclosure";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";
import {
  ConsumableStock,
  useDeleteConsumableStockMutation,
  useGetConsumableStocksQuery,
} from "@/services/api/consumable-stock";
import { humanizedDate } from "@/utils/date";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const [deleteMutation] = useDeleteConsumableStockMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Consumable Stocks</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New Stock
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetConsumableStocksQuery}
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
                keyIndex: "quantity",
                header: "Quantity",
              },
              {
                keyIndex: "balance",
                header: "In Stock",
              },
              {
                keyIndex: "price",
                header: "Price",
              },
              {
                header: "Returned",
                render: (row) =>
                  row.returnedAt ? humanizedDate(row.returnedAt) : "In Stock",
              },
              {
                header: "Expired Date",
                render: (row) => humanizedDate(row.expiredAt),
              },
              {
                header: "Created Date",
                render: (row) => humanizedDate(row.createdAt),
              },
              createProTableColumnActions<ConsumableStock>({
                actions: [
                  {
                    icon: <IconTrash />,
                    label: "Delete",
                    onClick(row) {
                      deleteConfirmation("Delete Stock", () =>
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
    </>
  );
};
