import { Box, Card, Grid, InputLabel, Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import { randomId } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { PatientProfile } from "../../../features/PatientProfile";
import { ScreeningDetail } from "./screening-detail";
import { SOAPForm } from "./soap-form";
import { ClassificationDiseaseSection } from "./components/ClassificationDiseaseSection";
import { PrescriptionTable } from "./components/PrescriptionTable";
import { PrescriptionForm } from "./components/PrescriptionForm";
import { Footer } from "./components/Footer";
import { OtherField } from "./other-field";
import { AllergySection } from "./components/AllergySection";
import { EncounterAct } from "./components/EncounterAct";
import { HistorySection } from "./components/HistorySection";

export const Component = () => {
  const params = useParams();
  const id = params.id as string;

  const [patientId, setPatientId] = useState<string | null>(null);
  const [prescriptionId, setPrescriptionId] = useState(randomId());

  return (
    <Grid columns={2}>
      <Grid.Col span={1}>
        <PatientProfile
          encounterId={id}
          onRendered={(patient) => setPatientId(patient.id)}
        />
      </Grid.Col>

      <Grid.Col span={1}>
        <ScreeningDetail encounterId={id} />
      </Grid.Col>

      <Grid.Col span={2}>
        <Card withBorder>
          <Card.Section>
            <Tabs defaultValue="diagnosis">
              <Tabs.List>
                <Tabs.Tab value="diagnosis">Diagnosis</Tabs.Tab>
                <Tabs.Tab value="allergy">Allergy</Tabs.Tab>
                <Tabs.Tab value="history">Riwayat Kunjungan</Tabs.Tab>
              </Tabs.List>

              <Box p={16}>
                <Tabs.Panel value="diagnosis">
                  <Stack>
                    <SOAPForm encounterId={id} />
                    <Card withBorder>
                      <Card.Section withBorder p={8}>
                        <InputLabel ta="center">Plan</InputLabel>
                      </Card.Section>
                      <Card.Section>
                        <Box p="md">
                          <OtherField encounterId={id} />
                        </Box>
                        <Tabs orientation="vertical">
                          <Tabs.List>
                            <Tabs.Tab value="prescription">
                              Prescription
                            </Tabs.Tab>
                            <Tabs.Tab value="encounter-act">Tindakan</Tabs.Tab>
                            <Tabs.Tab value="other">Lainnya</Tabs.Tab>
                          </Tabs.List>

                          <Tabs.Panel value="prescription" p={8}>
                            <Stack gap="xl">
                              <PrescriptionTable encounterId={id} />
                              <PrescriptionForm
                                key={prescriptionId}
                                encounterId={id}
                                onReset={() => setPrescriptionId(randomId())}
                              />
                            </Stack>
                          </Tabs.Panel>

                          <Tabs.Panel value="encounter-act">
                            <EncounterAct encounterId={id} />
                          </Tabs.Panel>
                        </Tabs>
                      </Card.Section>
                    </Card>

                    <ClassificationDiseaseSection encounterId={id} />
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="allergy">
                  <AllergySection encounterId={id} />
                </Tabs.Panel>

                <Tabs.Panel value="history">
                  {patientId && <HistorySection patientId={patientId} />}
                </Tabs.Panel>
              </Box>
            </Tabs>
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col span={2}>
        <Footer />
      </Grid.Col>
    </Grid>
  );
};
