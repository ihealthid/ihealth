import { Detail } from "./Detail";
import {
  Diagnose,
  useGetDiagnoseQuery,
  usePutDiagnoseMutation,
} from "@/services/api/diagnose";
import { SelectClassificationDisease } from "./SelectClassificationDisease";
import { Card, CardSection, Title } from "@mantine/core";

interface ClassificationDiseaseSectionProps {
  encounterId: number;
}

const getDetail = (data?: Diagnose) => {
  if (!data) return undefined;
  return data.classificationDisease;
};

export const ClassificationDiseaseSection = ({
  encounterId,
}: ClassificationDiseaseSectionProps) => {
  const { data } = useGetDiagnoseQuery({ encounterId });
  const detail = getDetail(data?.data);
  const [mutate] = usePutDiagnoseMutation();
  return (
    <Card withBorder>
      <CardSection withBorder p="sm">
        <Title order={6}>Classification Disease</Title>
      </CardSection>
      <CardSection p="sm">
        <SelectClassificationDisease
          onChange={(id) => {
            if (id) {
              mutate({
                encounterId,
                classificationDiseaseId: id,
              });
            }
          }}
        />
        {detail && <Detail data={detail} />}
      </CardSection>
    </Card>
  );
};
