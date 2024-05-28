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
  IconTruck,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

const administratorNavs: { label: string; link: string }[] = [
  { label: "Role", link: "role" },
  { label: "User", link: "user" },
  { label: "Area", link: "area" },
  { label: "Classification Deasease", link: "classification-disease" },
  { label: "Encounter Act", link: "encounter-act" },
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
    link: "healthcare-service",
  },
  {
    label: "Patient Condition",
    link: "patient-condition",
  },
];

const pharmachyNavs: { label: string; link: string }[] = [
  {
    label: "Manufacture",
    link: "manufacture",
  },
  {
    label: "Brand",
    link: "brand",
  },
  {
    label: "Distributor",
    link: "distributor",
  },
  {
    label: "Ingredient",
    link: "ingredient",
  },
  {
    label: "Medication",
    link: "medication",
  },
  {
    label: "Procurement",
    link: "procurement",
  },
];

export const AdministratorNav = () => {
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
          <LinksGroup
            label="Dashboard"
            link="/administrator/"
            icon={IconDashboard}
          />
          <div className={classes.line} />

          <LinksGroup
            label="Master Data"
            icon={IconDatabase}
            links={administratorNavs}
          />
        </div>
      </ScrollArea>
      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
};

export const PharmacyNav = () => {
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
          <LinksGroup label="Dashboard" link="/pharmacy" icon={IconDashboard} />
          <div className={classes.line} />
          {pharmachyNavs.map((row) => (
            <LinksGroup
              label={row.label}
              link={`/pharmacy/${row.link}`}
              icon={IconUser}
            />
          ))}
        </div>
      </ScrollArea>
      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
};

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
          <LinksGroup
            label="Procurement"
            link="/procurement"
            icon={IconTruck}
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
