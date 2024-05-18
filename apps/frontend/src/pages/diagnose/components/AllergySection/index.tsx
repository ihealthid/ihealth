import { Button, Flex } from "@mantine/core";
import { AllergyTable } from "./AllergyTable";
import { FormAdd } from "./FormAdd";
import { useRef } from "react";
import { DisclosureAction } from "@/types/disclosure";

interface AllergySectionProps {
  encounterId: number;
}

export const AllergySection = ({ encounterId }: AllergySectionProps) => {
  const formAddRef = useRef<DisclosureAction>(null);

  return (
    <>
      <Flex justify="end" mb={24}>
        <Button onClick={() => formAddRef.current?.open()}>Tambah</Button>
      </Flex>
      <AllergyTable encounterId={encounterId} />
      <FormAdd ref={formAddRef} encounterId={encounterId} />
    </>
  );
};
