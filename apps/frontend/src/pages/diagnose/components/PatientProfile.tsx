import { useGetPatientByEncounterIdQuery } from "@/services/api/patient";
import { ageCounter } from "@/utils/date";
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useMemo } from "react";

interface ProfilePatientProps {
  encounterId: string;
}

const gender: { [key: string]: string } = {
  MALE: "Laki-Laki",
  FEMALE: "Perempuan",
};

export function PatientProfile({ encounterId }: Readonly<ProfilePatientProps>) {
  const { data } = useGetPatientByEncounterIdQuery({ encounterId });

  const identifiers = useMemo(() => {
    if (!data) return {};
    const arrObj = data.data.identifies.map((identify) => {
      const keys = identify.system.split("/");
      const key = keys[keys.length - 1];
      return {
        [key]: identify.value,
      };
    });

    return arrObj.reduce((acc, current) => ({ ...acc, ...current }));
  }, [data]);

  if (!data) {
    return null;
  }

  const { years, month, day } = ageCounter(data?.data.birthDate);

  return (
    <Card withBorder radius="md">
      <Card.Section bg="pink" c="white" px={16} py={12}>
        <Flex justify="space-between">
          <Title order={4}>Profil Pasien</Title>
          <Tooltip label="Lihat Profil">
            <ActionIcon variant="subtle" color="white">
              <IconLink />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Card.Section>
      <SimpleGrid cols={2} mt={16}>
        <Box>
          <Text size="sm" c="gray.6">
            NIK
          </Text>
          <Text fw="bold">{identifiers.nik}</Text>
        </Box>
        <Box>
          <Text size="sm" c="gray.6">
            HIS
          </Text>
          <Text fw="bold">{identifiers.nik}</Text>
        </Box>
        <Box>
          <Text size="sm" c="gray.6">
            Nama Lengkap
          </Text>
          <Text fw="bold">{data.data.fullName}</Text>
        </Box>
        <Box>
          <Text size="sm" c="gray.6">
            Jenis Kelamin
          </Text>
          <Text fw="bold">{gender[data.data.gender]}</Text>
        </Box>
        <Box>
          <Text size="sm" c="gray.6">
            Usia
          </Text>

          <Text fw="bold">
            {years} Tahun, {month} Bulan, {day} Hari
          </Text>
        </Box>
        <Box>
          <Text size="sm" c="gray.6">
            Alamat
          </Text>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
