import { Code, Group, ScrollArea, Text, rem } from "@mantine/core";
import { Logo } from "../Logo";
import { UserButton } from "../user-button";
import classes from "./style.module.css";
import { LinksGroup } from "@/components/navbar-links-group";
import {
  IconCash,
  IconDashboard,
  IconDatabase,
  IconList,
  IconMedicineSyrup,
  IconRegistered,
  IconUsersGroup,
} from "@tabler/icons-react";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup label="Dashboard" link="/" icon={IconDashboard} />
          <div className={classes.line} />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Administrator
          </Text>
          <LinksGroup label="Pengguna" link="/user" icon={IconUsersGroup} />
          <LinksGroup
            label="Mater Data"
            links={[
              { label: "Hak Akses", link: "/role" },

              {
                label: "Wilayah Administrasi",
                link: "/area",
              },
              {
                label: "Classification Disease",
                link: "/classification-disease",
              },
              {
                label: "Encounter Act",
                link: "/encounter-act",
              },
              {
                label: "Act Encounter Code",
                link: "act-encounter-code",
              },
              {
                label: "Participant Type Code",
                link: "participant-type-code",
              },
              {
                label: "Marital Status",
                link: "marital-status",
              },
              {
                label: "Encounter Status",
                link: "encounter-status",
              },
              {
                label: "Healthcare Service",
                link: "/healthcare-service",
              },
              {
                label: "Patient Condition",
                link: "/patient-condition",
              },
              {
                label: "Manufacture",
                link: "/manufacture",
              },
              {
                label: "Brand",
                link: "/brand",
              },
            ]}
            icon={IconDatabase}
          />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Farmasi
          </Text>
          <LinksGroup label="Pesanan" link="/order" icon={IconList} />
          <LinksGroup
            label="Obat - Obatan"
            link="/medication"
            icon={IconMedicineSyrup}
          />
          <LinksGroup
            label="Consumable"
            link="/consumable"
            icon={IconMedicineSyrup}
          />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Resepsionis
          </Text>
          <LinksGroup
            label="Pendaftaran"
            link="/admission"
            icon={IconRegistered}
          />
          <LinksGroup label="Pasien" link="/patient" icon={IconUsersGroup} />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Perawat
          </Text>
          <LinksGroup
            label="Daftar Tunggu"
            link="/waiting-list"
            icon={IconRegistered}
          />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Dokter
          </Text>
          <LinksGroup
            label="Daftar Pertemuan"
            link="/appointment"
            icon={IconRegistered}
          />
          <Text size="xs" c="dimmed" fw={500} pl={16} py={8}>
            Kasir
          </Text>
          <LinksGroup label="Pembayaran" link="/payment" icon={IconCash} />
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
