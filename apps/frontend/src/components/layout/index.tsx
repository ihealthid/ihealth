import { AppShell, Group } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useLoginChecker } from "@/hooks/useLoginChecker";
import { Timer } from "../Timer";
import { ReactNode } from "react";

interface LayoutProps {
  navbar: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  useLoginChecker();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "lg" }}
      p="lg"
      bg="gray.1"
    >
      <AppShell.Header>
        <Group>
          <Timer />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>{props.navbar}</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
