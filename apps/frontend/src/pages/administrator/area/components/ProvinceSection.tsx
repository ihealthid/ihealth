import { Card, CardSection, Flex, Title } from "@mantine/core";
import { ButtonImport } from "./ButtonImport";
import {
  useGetProvincesQuery,
  usePostProvinceMutation,
} from "@/services/api/area";
import { ProTable } from "@/components/ProTable";

export const ProvinceSection = () => {
  return (
    <Card>
      <Flex justify="space-between">
        <Title order={4}>Provinsi</Title>
        <ButtonImport useMutation={usePostProvinceMutation} />
      </Flex>
      <CardSection mt="md">
        <ProTable
          queryLoader={useGetProvincesQuery}
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
