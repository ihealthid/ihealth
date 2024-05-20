import { useDonePaymentMutation } from "@/services/api/payment";
import {
  Grid,
  Card,
  Title,
  Table,
  TableTbody,
  TableTr,
  TableTd,
  NumberFormatter,
  Stack,
  NumberInput,
  Button,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface TotalSectionProps {
  id: string;
  subtotal: number;
  discount: number;
  total: number;
}

export const TotalSection = ({
  id,
  subtotal,
  discount,
  total,
}: TotalSectionProps) => {
  const navigate = useNavigate();
  const [cash, setCash] = useInputState<string | number>(0);
  const changes = +cash - total;

  const [doneMutation] = useDonePaymentMutation();

  return (
    <Grid.Col span={1}>
      <Card>
        <Title order={4}>Tagihan</Title>
        <Table mt="xl">
          <TableTbody>
            <TableTr>
              <TableTd ta="right">Subtotal</TableTd>
              <TableTd ta="right">
                <NumberFormatter
                  value={subtotal}
                  thousandSeparator
                  prefix="Rp. "
                />
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd ta="right">Diskon</TableTd>
              <TableTd ta="right">
                <NumberFormatter
                  value={discount}
                  thousandSeparator
                  prefix="Rp. "
                />
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd ta="right" fw={700}>
                Total
              </TableTd>
              <TableTd ta="right" fw={700}>
                <NumberFormatter
                  value={total}
                  thousandSeparator
                  prefix="Rp. "
                />
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd ta="right">Uang Kembali</TableTd>
              <TableTd ta="right">
                <NumberFormatter
                  value={changes}
                  thousandSeparator
                  prefix="Rp. "
                />
              </TableTd>
            </TableTr>
          </TableTbody>
        </Table>

        <Stack mt="xl">
          <NumberInput
            thousandSeparator
            label="Cash"
            leftSection={<IconCash />}
            styles={{
              input: {
                textAlign: "right",
                paddingRight: 32,
              },
            }}
            onChange={setCash}
          />
        </Stack>

        <Button
          mt="md"
          leftSection={<IconCash />}
          onClick={() => {
            doneMutation(id).then(() => {
              navigate("/payment");
            });
          }}
        >
          Pay
        </Button>
      </Card>
    </Grid.Col>
  );
};
