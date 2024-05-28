import { Card, CardSection, Flex, Title } from "@mantine/core";
import { ButtonImport } from "./ButtonImport";
import {
  useGetRegenciesQuery,
  usePostRegencyMutation,
} from "@/services/api/area";
import { ProTable } from "@/components/ProTable";

export const RegencySection = () => {
  return (
    <Card>
      <Flex justify="space-between">
        <Title order={4}>Kabupaten</Title>
        <ButtonImport useMutation={usePostRegencyMutation} />
      </Flex>
      <CardSection mt="md">
        <ProTable
          queryLoader={useGetRegenciesQuery}
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
