import {
  Button,
  Card,
  CardSection,
  Flex,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { AddStockSection } from "./components/AddStockSection";
import { StockCard } from "./components/StockCard";
import { useGetMedicationStockCountQuery } from "@/services/api/medication";
import { IconPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable } from "@/components/ProTable";
import { DisclosureAction } from "@/types/disclosure";
import { useGetMedicationStocksQuery } from "@/services/api/medication-stock";

export const Component = () => {
  const params = useParams();
  const addSectionRef = useRef<DisclosureAction>(null);
  const medicationId = params.id as string;

  const { data } = useGetMedicationStockCountQuery({ medicationId });

  return (
    <>
      <SimpleGrid cols={4}>
        <StockCard label="All Stoks" value={data?.data.all ?? 0} />
        <StockCard label="Good" value={data?.data.good ?? 0} />
        <StockCard label="Will Expire" value={data?.data.beforeExpires ?? 0} />
        <StockCard label="Expired" value={data?.data.expired ?? 0} />
      </SimpleGrid>

      <Card mt="md">
        <Flex justify="space-between" mb="md">
          <Title order={4}>Medication Stocks</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add Stock
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetMedicationStocksQuery}
            pathParams={{ medicationId }}
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
                keyIndex: "expiredAt",
                header: "Expired Date",
              },
            ]}
          />
        </CardSection>
      </Card>

      <AddStockSection ref={addSectionRef} medicationId={medicationId} />
    </>
  );
};
