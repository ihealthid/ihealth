import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";

export type Links = {
  label: string;
  link: string;
}[];

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: Links;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: Readonly<LinksGroupProps>) {
  const navigate = useNavigate();
  const isNested = Array.isArray(links);

  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (isNested ? links : []).map((link) => (
    <Link className={classes.link} to={link.link} key={link.label}>
      {link.label}
    </Link>
  ));

  const goTo = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <UnstyledButton
        onClick={() => (isNested ? setOpened((o) => !o) : goTo())}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {isNested && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {isNested ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
