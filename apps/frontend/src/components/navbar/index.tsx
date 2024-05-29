import { Group, ScrollArea, rem } from "@mantine/core";
import { Logo } from "../Logo";
import { UserButton } from "../user-button";
import classes from "./style.module.css";
import { Links, LinksGroup } from "@/components/navbar-links-group";
import {
  IconDashboard,
  IconDatabase,
  IconList,
  IconUser,
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
      ],
    },
  ],
};

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

const receptionistNavs: { label: string; link: string }[] = [
  {
    label: "Admission",
    link: "admission",
  },
  {
    label: "Patient",
    link: "patient",
  },
];

const nurseNavs: { label: string; link: string }[] = [
  {
    label: "Waiting List",
    link: "waiting-list",
  },
];

const doctorNavs: { label: string; link: string }[] = [
  {
    label: "Appoitment",
    link: "appointment",
  },
];

const cashierNavs: { label: string; link: string }[] = [
  {
    label: "Payment",
    link: "payment",
  },
];

export const PharmacyNav = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo style={{ width: rem(120) }} />
        </Group>
      </div>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup label="Dashboard" link="/pharmacy" icon={IconDashboard} />
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

export const ReceptionistNav = () => {
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
            link="/receptionist"
            icon={IconDashboard}
          />
          {receptionistNavs.map((row) => (
            <LinksGroup
              label={row.label}
              link={`/receptionist/${row.link}`}
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

export const NurseNav = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo style={{ width: rem(120) }} />
        </Group>
      </div>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup label="Dashboard" link="/nurse" icon={IconDashboard} />
          {nurseNavs.map((row) => (
            <LinksGroup
              label={row.label}
              link={`/nurse/${row.link}`}
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

export const DoctorNav = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo style={{ width: rem(120) }} />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup label="Dashboard" link="/doctor" icon={IconDashboard} />
          {doctorNavs.map((row) => (
            <LinksGroup
              label={row.label}
              link={"/doctor/" + row.link}
              icon={IconList}
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

export const CashierNav = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo style={{ width: rem(120) }} />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinksGroup label="Dashboard" link="/cashier" icon={IconDashboard} />
          {cashierNavs.map((row) => (
            <LinksGroup
              label={row.label}
              link={"/cashier/" + row.link}
              icon={IconList}
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
