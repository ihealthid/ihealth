import { Card, Flex, Checkbox } from "@mantine/core";
import { FinishButton } from "./FinishButton";
import { useState } from "react";

export const Footer = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Card withBorder radius="md">
      <Flex justify="space-between" align="center">
        <Checkbox
          label="Saya sudah selesai melakukan pemeriksaan dan mengisi data"
          onChange={(e) => setDisabled(!e.currentTarget.checked)}
        />
        <FinishButton disabled={disabled} />
      </Flex>
    </Card>
  );
};
