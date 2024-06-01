import { Affix, Card, CardSection, Grid, Title } from "@mantine/core";
import { PatientDetail } from "./components/PatientDetail";
import { useGetPrescriptionQuery } from "@/services/api/prescription";
import { useParams } from "react-router-dom";
import { FinishButton } from "./components/FinishButton";
import { ProTable } from "@/components/ProTable";
import { useGetPrescriptionItemsQuery } from "@/services/api/prescription-item";

export const Component = () => {
  const params = useParams();
  const id = params.id as string;
  const { data } = useGetPrescriptionQuery(id);

  const patient = data?.data.encounter?.patient;

  return (
    <>
      <Grid columns={3}>
        <Grid.Col span={2}>
          <Card>
            <Title order={4}>Medication</Title>

            <CardSection mt="md">
              <ProTable
                queryLoader={useGetPrescriptionItemsQuery}
                query={{
                  "filter.prescriptionId": "$eq:" + id,
                }}
                cols={[
                  {
                    header: "No",
                    render: (_, index) => index + 1,
                  },
                  {
                    keyIndex: "medication.name",
                    header: "Medication",
                  },
                  {
                    keyIndex: "quantity",
                    header: "Quantity",
                  },
                  {
                    keyIndex: "doses",
                    header: "Doses",
                  },
                  {
                    keyIndex: "frequency",
                    header: "Frequency",
                  },
                  {
                    keyIndex: "note",
                    header: "Note",
                  },
                ]}
              />
            </CardSection>
          </Card>
        </Grid.Col>
        <Grid.Col span={1}>
          {patient && <PatientDetail data={patient} />}
        </Grid.Col>
      </Grid>

      <Affix position={{ bottom: 24, right: 24 }}>
        <FinishButton id={id} />
      </Affix>
    </>
  );
};
