import { Group, Menu, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useState } from "react";

interface SearchFieldProps {
  onChange: (item: { key: string; value: string }) => void;
}

export const SearchField = ({ onChange }: SearchFieldProps) => {
  const { colors, radius, spacing, fontSizes } = useMantineTheme();
  const [key, setKey] = useState({
    display: "Search by Name",
    value: "fullName:iLike",
  });

  return (
    <Group
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.gray[4],
        borderRadius: radius.md,
        backgroundColor: colors.gray[2],
        padding: 0,
      }}
      gap="sm"
    >
      <Menu>
        <Menu.Target>
          <Text style={{ marginLeft: spacing.sm, fontSize: fontSizes.sm }}>
            {key.display}
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              setKey({ display: "Search by Name", value: "fullName:iLike" });
            }}
          >
            Search by Name
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              setKey({ display: "Search by NIK", value: "fullName:iLike" })
            }
          >
            Search by NIK
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <TextInput
        style={{ borderWidth: 0, borderStyle: "none" }}
        onChange={(e) => {
          onChange({ key: key.value, value: e.currentTarget.value });
        }}
      />
    </Group>
  );
};
