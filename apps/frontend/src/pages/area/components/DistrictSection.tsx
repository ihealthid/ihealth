import { Card, CardSection, Flex, Title } from "@mantine/core";
import { ButtonImport } from "./ButtonImport";
import {
  useGetDistrictsQuery,
  usePostDistrictMutation,
} from "@/services/api/area";
import { ProTable } from "@/components/ProTable";

export const DistrictSection = () => {
  return (
    <Card>
      <Flex justify="space-between">
        <Title order={4}>Kecamatan</Title>
        <ButtonImport useMutation={usePostDistrictMutation} />
      </Flex>
      <CardSection mt="md">
        <ProTable
          queryLoader={useGetDistrictsQuery}
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
