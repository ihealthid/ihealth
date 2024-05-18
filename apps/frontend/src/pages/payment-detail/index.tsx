import { useGetPaymentQuery } from "@/services/api/payment";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  NumberFormatter,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { TotalSection } from "./components/TotalSection";

export const Component = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const { data } = useGetPaymentQuery(id);

  return (
    <Grid columns={3}>
      <Grid.Col span={2}>
        <Card>
          <Group>
            <Avatar>A</Avatar>
            <Text>Dikry Alfiannur Wahyu</Text>
          </Group>
          <Divider my="md" />
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>No</TableTh>
                <TableTh>Deskripsi</TableTh>
                <TableTh>Biaya/Harga</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {data?.data.paymentItems.map((item, index) => (
                <TableTr key={item.name}>
                  <TableTd>{index + 1}</TableTd>
                  <TableTd>{item.name}</TableTd>
                  <TableTd>
                    <NumberFormatter
                      value={item.subtotal}
                      thousandSeparator
                      prefix="Rp. "
                    />
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Card>
      </Grid.Col>
      <TotalSection
        id={id}
        subtotal={data?.data.subtotal ?? 0}
        total={data?.data.total ?? 0}
        discount={data?.data.discount ?? 0}
      />
    </Grid>
  );
};
