import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import { useLoginChecker } from "@/hooks/useLoginChecker";

export const Component = () => {
  useLoginChecker()
  
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "lg" }}
      p="lg"
      bg="gray.1"
    >
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
