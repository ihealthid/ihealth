import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";
import { Payment, useGetPaymentsQuery } from "@/services/api/payment";
import { Card, CardSection, Flex, Title } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  const queryParam = usePaginateQuery();

  return (
    <>
      <Card>
        <Flex>
          <Title order={4}>Payment</Title>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetPaymentsQuery}
            query={queryParam.get()}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
                sortable: (sort) =>
                  queryParam.set(
                    "sortBy",
                    "id:" + sort,
                  ),
              },
              {
                keyIndex: "encounterPayment.encounter.patient.fullName",
                header: "Patient",
                sortable: (sort) =>
                  queryParam.set(
                    "sortBy",
                    "encounterPayment.encounter.patient.fullName:" + sort,
                  ),
              },
              {
                keyIndex: "status.display",
                header: "Status",
                sortable: (sort) =>
                  queryParam.set("sortBy", "status.displa:" + sort),
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
