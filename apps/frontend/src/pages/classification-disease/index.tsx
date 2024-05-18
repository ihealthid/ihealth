import {
  ActionIcon,
  Card,
  CardSection,
  Flex,
  Title,
  Tooltip,
} from "@mantine/core";
import { AddSection, AddSectionRef } from "./components/AddSection";
import { IconFileImport } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable } from "@/components/ProTable";
import { useGetClassificationDiseasesQuery } from "@/services/api/classification-disease";

export const Component = () => {
  const addSectionRef = useRef<AddSectionRef>(null);
  return (
    <>
      <Card>
        <Flex justify="space-between" mb="md">
          <Title order={4}>Classification Disease</Title>
          <Tooltip label="Import">
            <ActionIcon
              variant="subtle"
              onClick={() => addSectionRef.current?.open()}
            >
              <IconFileImport />
            </ActionIcon>
          </Tooltip>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetClassificationDiseasesQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "display",
                header: "Display",
              },
              {
                keyIndex: "definition",
                header: "Definition",
              },
            ]}
          />
        </CardSection>
      </Card>
      <AddSection ref={addSectionRef} />
    </>
  );
};
