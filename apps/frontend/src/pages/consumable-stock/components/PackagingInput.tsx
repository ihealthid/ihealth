import { NumberInput, Select } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

const packagingOptions: Readonly<SelectOption[]> = Object.freeze([
  { label: "Pcs", value: "pcs" },
  { label: "Packs", value: "packs" },
  { label: "Boxes", value: "boxes" },
  { label: "Cartons", value: "cartons" },
]);

type Values = Record<string, string | number>;

interface PackagingInputProps {
  onChange?: (values: Values) => void;
}

export const PackagingInput = ({ onChange }: PackagingInputProps) => {
  const [packaging, setPackaging] = useState<string>("pcs");
  const [values, setValues] = useSetState<Values>({});

  const renderQuantityInputs = useCallback(() => {
    const inputs = [
      <NumberInput
        key="pcs"
        label="Quantity (pcs)"
        onChange={(pcs) => setValues({ pcs })}
      />,
    ];

    if (["packs", "boxes", "cartons"].includes(packaging)) {
      inputs.unshift(
        <NumberInput
          key="packs"
          label="Quantity (packs)"
          onChange={(packs) => setValues({ packs })}
        />
      );
    }

    if (["boxes", "cartons"].includes(packaging)) {
      inputs.unshift(
        <NumberInput
          key="boxes"
          label="Quantity (boxes)"
          onChange={(boxes) => setValues({ boxes })}
        />
      );
    }

    if (packaging === "cartons") {
      inputs.unshift(
        <NumberInput
          key="cartons"
          label="Quantity (cartons)"
          onChange={(cartons) => setValues({ cartons })}
        />
      );
    }

    return inputs;
  }, [packaging]);

  useEffect(() => {
    onChange?.(values);
  }, [values]);

  return (
    <>
      <Select
        label="Packaging"
        data={packagingOptions}
        defaultValue={packagingOptions[0].value}
        onChange={(value) => setPackaging(value || "pcs")}
      />
      {renderQuantityInputs()}
    </>
  );
};
