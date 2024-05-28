import { ClassificationDisease } from "@/services/api/classification-disease";
import { Box, Stack, Text } from "@mantine/core";

interface DetailProps {
  data: ClassificationDisease;
}

export const Detail = ({ data }: DetailProps) => {
  return data ? (
    <Stack mt={24}>
      <Box>
        <Text size="sm" c="gray.8">
          Code
        </Text>
        <Text fw={500}>{data.display}</Text>
      </Box>

      <Box>
        <Text size="sm" c="gray.8">
          Definition
        </Text>
        <Text fw={500}>{data.definition}</Text>
      </Box>
    </Stack>
  ) : null;
};
