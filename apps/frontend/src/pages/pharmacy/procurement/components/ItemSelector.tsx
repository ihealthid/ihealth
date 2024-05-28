import { SelectMedication } from "@/features/SelectMedication";
import {
  Grid,
  NumberInput,
  Select,
  Flex,
  ActionIcon,
  Stack,
  Table,
  TableTbody,
  TableTr,
  TableTd,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMap } from "@mantine/hooks";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import _ from "lodash";
import { DateInput } from "@mantine/dates";

interface InitialState {
  medicationId: string | null;
  quantity: number | string;
  unit: string | null;
  price: number | string;
  discount: number | string;
  expiredAt: Date | string | null;
}

interface ItemSelectorProps {
  onChange: (values: InitialState[]) => void;
}

export const ItemSelector = ({ onChange }: ItemSelectorProps) => {
  const map = useMap<number, InitialState>([]);

  const form = useForm<InitialState>({
    initialValues: {
      medicationId: null,
      quantity: 0,
      unit: "Tablet",
      price: 0,
      discount: 0,
      expiredAt: null,
    },
  });

  const onAdd = useCallback(() => {
    map.set(Date.now(), form.getValues());
    onChange(Array.from(map.values()));
    form.reset();
  }, [form]);

  return (
    <Stack>
      <Table>
        <TableTbody>
          {Array.from(map.entries()).map(([key, cols]) => (
            <TableTr key={key}>
              {Object.keys(cols).map((idxPath, i) => (
                <TableTd key={i}>{String(_.get(cols, idxPath))}</TableTd>
              ))}
              <TableTd>
                <ActionIcon variant="subtle" onClick={() => map.delete(key)}>
                  <IconMinus />
                </ActionIcon>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <Grid columns={8}>
        <Grid.Col span={2}>
          <SelectMedication
            value={form.getValues().medicationId}
            onChange={(val) => form.setFieldValue("medicationId", val)}
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <NumberInput {...form.getInputProps("quantity")} label="Quantity" />
        </Grid.Col>

        <Grid.Col span={1}>
          <Select
            {...form.getInputProps("unit")}
            label="Unit"
            data={["Tablet", "Syrup", "Drop", "Powder"]}
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <NumberInput {...form.getInputProps("price")} label="Price" />
        </Grid.Col>

        <Grid.Col span={1}>
          <NumberInput {...form.getInputProps("discount")} label="Discount" />
        </Grid.Col>

        <Grid.Col span={1}>
          <DateInput
            {...form.getInputProps("expiredAt")}
            label="Expired Date"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <Flex align="end" pt={26}>
            <ActionIcon size="lg" onClick={onAdd}>
              <IconPlus />
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
