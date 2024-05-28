import { useGetObservationByEncounterIdQuery } from "@/services/api/observation";
import { IMTCounter } from "@/utils/body-weight-calculator";
import { Box, Card, SimpleGrid, Text, Title } from "@mantine/core";
import { useCallback, useMemo } from "react";

interface ScreeningDetailProps {
  encounterId: string;
}

export function ScreeningDetail({
  encounterId,
}: Readonly<ScreeningDetailProps>) {
  const { data } = useGetObservationByEncounterIdQuery({ encounterId });

  const getValue = useCallback((type: string, value: string) => {
    switch (type) {
      case "boolean":
        return value === "true" ? true : false;
      case "number":
        return parseInt(value);
      default:
        return value;
    }
  }, []);

  const computedData = useMemo(() => {
    const u = data?.data.entries?.map((entry) => ({
      [entry.code]: getValue(entry.code, entry.value),
    }));

    return u?.reduce((acc, current) => ({ ...acc, ...current }));
  }, [data]);

  const counter = IMTCounter({
    height: (computedData?.height as number) ?? 0,
    weight: (computedData?.weight as number) ?? 0,
  });

  return (
    <Card withBorder radius="md">
      <Card.Section bg="pink" c="white" px={16} py={12}>
        <Title order={4}>Hasil Observasi Awal</Title>
      </Card.Section>
      <SimpleGrid cols={2} mt={16}>
        <ValueWithLabel
          label="Tekanan Darah"
          value={`${computedData?.systole}/${computedData?.diastole} mmHg`}
        />

        {computedData?.height && computedData?.weight && (
          <ValueWithLabel
            label="Tinggi Badan / Berat Badan"
            value={`${computedData?.height} cm / ${computedData?.weight} kg`}
          />
        )}

        <ValueWithLabel
          label="Lingkar Pinggang"
          value={computedData?.waistline}
          appendText="cm"
        />

        <ValueWithLabel
          label="Lingkar Kepala"
          value={computedData?.headCircumference}
          appendText="cm"
        />

        <ValueWithLabel
          label="Detak Jantung"
          value={computedData?.heartRate}
          appendText="bpm"
        />

        <ValueWithLabel
          label="Respiratory Rate"
          value={computedData?.respiratoryRate}
          appendText="bpm"
        />

        <ValueWithLabel
          label="Suhu Badan"
          value={computedData?.respiratoryRate}
          appendText="°C"
        />

        <ValueWithLabel
          label="Saturasi Oksigen"
          value={computedData?.saturationOxygen}
          appendText="SaO2"
        />

        {computedData?.height && computedData?.weight && (
          <ValueWithLabel
            label="IMT"
            value={`${counter.imt} (${counter.status})`}
            appendText=""
          />
        )}

        <ValueWithLabel
          label="Anamnesis"
          value={computedData?.anamnesis}
          appendText=""
        />
      </SimpleGrid>
    </Card>
  );
}

const ValueWithLabel = ({
  label,
  value,
  appendText,
}: {
  label: string;
  value?: string | number | null | boolean;
  appendText?: string;
}) => {
  return value ? (
    <Box>
      <Text size="sm" c="gray.5">
        {label}
      </Text>
      <Text size="lg" fw="bold">
        {value} {appendText}
      </Text>
    </Box>
  ) : null;
};
