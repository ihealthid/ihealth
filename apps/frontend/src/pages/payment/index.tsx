import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { Payment, useGetPaymentsQuery } from "@/services/api/payment";
import { Card, CardSection, Flex, Title } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Flex>
          <Title order={4}>Payment</Title>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetPaymentsQuery}
            query={{
              "filter.status.order": "$lt:3",
            }}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "encounterPayment.patient.fullName",
                header: "Patient",
              },
              {
                keyIndex: "status.display",
                header: "Status",
              },
              createProTableColumnActions<Payment>({
                keyIndex: "",
                actions: [
                  {
                    icon: <IconCash />,
                    label: "Pay",
                    hidden: (row) => row.status.code === "done",
                    onClick(row) {
                      navigate("/payment/" + row.id);
                    },
                  },
                ],
              }),
            ]}
          />
        </CardSection>
      </Card>
    </>
  );
};
