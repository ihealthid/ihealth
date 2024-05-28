import { Card, CardSection, Flex, Title } from "@mantine/core";
import { ButtonImport } from "./ButtonImport";
import { ProTable } from "@/components/ProTable";
import {
  useGetVillagesQuery,
  usePostVillageMutation,
} from "@/services/api/area";

export const VillageSection = () => {
  return (
    <Card>
      <Flex justify="space-between">
        <Title order={4}>Desa</Title>
        <ButtonImport useMutation={usePostVillageMutation} />
      </Flex>
      <CardSection mt="md">
        <ProTable
          queryLoader={useGetVillagesQuery}
          cols={[
            {
              keyIndex: "id",
              header: "ID",
            },
            {
              keyIndex: "name",
              header: "Nama",
            },
          ]}
        />
      </CardSection>
    </Card>
  );
};
