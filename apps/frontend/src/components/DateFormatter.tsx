import { Text, TextProps } from "@mantine/core";
import dayjs from "dayjs";

interface DateFormatterProps extends TextProps {
  value: string;
  format: string;
}

export const DateFormatter = ({
  value,
  format,
  ...props
}: DateFormatterProps) => {
  const formatted = dayjs(value).format(format);
  return <Text {...props}>{formatted}</Text>;
};
