import {
  Card,
  CardSection,
  Flex,
  Group,
  NumberFormatter,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ProTable } from "@/components/ProTable";
import { useGetMedicationsQuery } from "@/services/api/medication";
import { Sortable } from "@/components/Sortable";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const paginateQuery = usePaginateQuery();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Medication</Title>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetMedicationsQuery}
            query={paginateQuery.get()}
            headerSection={() => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    paginateQuery.set(
                      "filter.name",
                      "$ilike:" + e.currentTarget.value,
                    )
                  }
                />
              </Group>
            )}
            cols={[
              {
                keyIndex: "name",
                header: (
                  <Group>
                    <Text>Name</Text>
                    <Sortable
                      onChange={(val) =>
                        paginateQuery.set("sortBy", "name:" + val)
                      }
                    />
                  </Group>
                ),
              },
              {
                keyIndex: "price",
                header: "Price",
                render: (row) => (
                  <NumberFormatter value={row.price} thousandSeparator />
                ),
              },
              {
                keyIndex: "stock",
                header: "Stock",
                render: (row) => (
                  <NumberFormatter value={row.price} thousandSeparator />
                ),
              },
              {
                keyIndex: "doseForm.display",
                header: "Dose Form",
              },
              {
                header: "Kandungan",
                render: (row) => (
                  <Text>
                    {row.ingredients.map((i) => i.ingredient.name).join(", ")}
                  </Text>
                ),
              },
            ]}
          />
        </CardSection>
      </Card>
    </>
  );
};
