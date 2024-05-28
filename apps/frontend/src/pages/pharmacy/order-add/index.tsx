import { Card, CardSection, Grid, GridCol, Title } from "@mantine/core";

import { useParams } from "react-router-dom";
import { FormAdd } from "./components/FormAdd";
import { PrescriptionItemTable } from "./components/PrescriptionItemTable";
import { Payment } from "./components/Payment";

export const Component = () => {
  const params = useParams();
  const id = parseInt(params.id as string);

  return (
    <Grid columns={4}>
      <GridCol span={3}>
        <Card>
          <Title order={4}>Daftar Pesanan Obat</Title>
          <CardSection mt={24}>
            <PrescriptionItemTable id={id} />
          </CardSection>
        </Card>
      </GridCol>

      <GridCol span={1}>
        <Card>
          <FormAdd id={id} />
        </Card>

        <Payment id={id} />
      </GridCol>
    </Grid>
  );
};
