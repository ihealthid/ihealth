import { Card, Flex, Title } from "@mantine/core";
import { ButtonAdd } from "./components/ButtonAdd";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  Prescription,
  useGetPrescriptionsQuery,
} from "@/services/api/prescription";
import { IconMedicineSyrup } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Flex justify="space-between" mb="md">
        <Title order={4}>Prescription</Title>
        <ButtonAdd />
      </Flex>
      <ProTable
        queryLoader={useGetPrescriptionsQuery}
        cols={[
          {
            keyIndex: "id",
            header: "ID",
          },
          {
            keyIndex: "encounter.patient.fullName",
            header: "Patient",
          },
          {
            keyIndex: "status.display",
            header: "Status",
          },
          createProTableColumnActions<Prescription>({
            actions: [
              {
                icon: <IconMedicineSyrup />,
                label: "Detail",
                onClick(row) {
                  navigate("/pharmachy/order-detail/" + row.id);
                },
              },
            ],
          }),
        ]}
      />
    </Card>
  );
};
