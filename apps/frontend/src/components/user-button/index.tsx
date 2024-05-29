import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  Menu,
  MenuItem,
} from "@mantine/core";
import { IconChevronRight, IconLogout2 } from "@tabler/icons-react";
import classes from "./style.module.css";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";

export function UserButton() {
  const [profile, setProfile] = useProfile();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Menu position="top-end">
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {profile?.fullName}
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuItem leftSection={<IconLogout2 />} onClick={logout}>
          Logout
        </MenuItem>
      </Menu.Dropdown>
    </Menu>
  );
}
