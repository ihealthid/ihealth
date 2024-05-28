import { useGetPrescriptionQuery } from "@/services/api/prescription";
import { PrescriptionItem } from "@/services/api/prescription-item";
import {
  Card,
  Title,
  Flex,
  Text,
  NumberFormatter,
  NumberInput,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { FinishButton } from "./FinishButton";

const countSubtotal = (data: PrescriptionItem[] = []) =>
  data
    .map((item) => item.quantity * item.medication.price)
    .reduce((prev, current) => prev + current, 0);

export const Payment = ({ id }: { id: number }) => {
  const [cash, setCash] = useState(0);
  const result = useGetPrescriptionQuery(id);
  const data = result.data?.data;
  const subtotal = useMemo(() => countSubtotal(data?.items), [data]);
  const charge = cash - subtotal;

  return (
    <Card mt={24}>
      <Title order={4}>Pembayaran</Title>
      <Flex mt={24} justify="space-between">
        <Text>Subtotal</Text>
        <Text fz={20} fw={500}>
          <NumberFormatter value={subtotal} thousandSeparator />
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Diskon</Text>
        <Text fz={20} fw={500}>
          0
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Total</Text>
        <Text fz={20} fw={500}>
          <NumberFormatter value={subtotal} thousandSeparator />
        </Text>
      </Flex>
      <NumberInput
        thousandSeparator
        mt={24}
        label="Uang Tunai"
        onChange={(e) => typeof e === "number" && setCash(e)}
      />
      <NumberInput
        mt={16}
        mb={24}
        label="Uang Kembali"
        readOnly
        value={charge}
        thousandSeparator
      />
      <FinishButton id={id} />
    </Card>
  );
};
