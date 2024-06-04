import { Group, ScrollArea, rem } from "@mantine/core";
import { Logo } from "../Logo";
import { UserButton } from "../user-button";
import classes from "./style.module.css";
import { Links, LinksGroup } from "@/components/navbar-links-group";
import {
  IconBottle,
  IconCash,
  IconDashboard,
  IconDatabase,
  IconList,
  IconListNumbers,
  IconMedicineSyrup,
  IconNote,
  IconPencil,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

interface Link {
  label: string;
  link?: string;
  icon: React.FC;
  links?: Links;
}

const links: {
  [key: string]: Link[];
} = {
  administrator: [
    {
      label: "Master Data",
      icon: IconDatabase,
      links: [
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
        {
          label: "Jenis Pembayaran",
          link: "payment-method",
        },
      ],
    },
  ],
  receptionist: [
    {
      label: "Admission",
      link: "admission",
      icon: IconPencil,
    },
    {
      label: "Patient",
      link: "patient",
      icon: IconUsers,
    },
  ],
  nurse: [
    {
      label: "Waiting List",
      link: "waiting-list",
      icon: IconListNumbers,
    },
  ],
  doctor: [
    {
      label: "Appoitment",
      link: "appointment",
      icon: IconListNumbers,
    },
    {
      label: "Medication",
      link: "medication",
      icon: IconMedicineSyrup,
    },
  ],
  cashier: [
    {
      label: "Payment",
      link: "payment",
      icon: IconCash,
    },
  ],
  pharmacy: [
    {
      label: "Master Data",
      icon: IconDatabase,
      links: [
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
      ],
    },
    {
      label: "Procurement",
      link: "procurement",
      icon: IconNote,
    },
    {
      label: "Pesanan",
      link: "order",
      icon: IconBottle,
    },
  ],
};

export const NavigationBar = ({ role }: { role: keyof typeof links }) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo style={{ width: rem(120) }} />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup
            label="Dashboard"
            link={`/${role}`}
            icon={IconDashboard}
          />
          {links[role].map((row) => (
            <LinksGroup
              label={row.label}
              link={`/${role}/${row.link}`}
              icon={row.icon}
              links={row.links}
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
