import { Card, Text, Title } from "@mantine/core";

interface StockCardProps {
  label: string;
  value: number;
}

export const StockCard = ({ label, value }: StockCardProps) => {
  return (
    <Card withBorder>
      <Title order={5}>{label}</Title>
      <Text fz={24} fw={500} ta="right">
        {value}
      </Text>
    </Card>
  );
};
