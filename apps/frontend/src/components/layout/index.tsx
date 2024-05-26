import { AppShell, Group } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import { useLoginChecker } from "@/hooks/useLoginChecker";
import { Timer } from "../Timer";

export const Component = () => {
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
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
