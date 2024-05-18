import { DateFormatter } from "@/components/DateFormatter";
import { Patient } from "@/services/api/patient";
import { Box, Card, Flex, Text, Title } from "@mantine/core";

interface PatientDetailProps {
  data: Patient;
}

export const PatientDetail = ({ data }: PatientDetailProps) => {
  return (
    <Card>
      <Title order={4}>Detail Pasien</Title>

      <Box mt="md">
        <Flex justify="space-between">
          <Text>Nama</Text>
          <Text fw={500}>{data.fullName}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Tanggal Lahir</Text>
          <DateFormatter
            fw={500}
            value={data.birthDate}
            format="DD MMMM YYYY"
          />
        </Flex>
      </Box>
    </Card>
  );
};
