import { Layout } from "@/components/layout";
import { AdministratorNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const administratorRoutes: RouteObject[] = [
  {
    path: "/administrator",
    element: <Layout navbar={<AdministratorNav />} />,
    children: [
      {
        path: "role",
        lazy: () => import("./role"),
      },
      {
        path: "user",
        lazy: () => import("./user"),
      },
      {
        path: "area",
        lazy: () => import("./area"),
      },
      {
        path: "classification-disease",
        lazy: () => import("./classification-disease"),
      },
      {
        path: "encounter-act",
        lazy: () => import("./encounter-act"),
      },
      {
        path: "participant-type-code",
        lazy: () => import("./participant-type-code"),
      },
      {
        path: "marital-status",
        lazy: () => import("./marital-status"),
      },
      {
        path: "encounter-status",
        lazy: () => import("./encounter-status"),
      },
      {
        path: "healthcare-service",
        lazy: () => import("./healthcare-service"),
      },
      {
        path: "patient-condition",
        lazy: () => import("./patient-condition"),
      },
      {
        path: "encounter-act-consumable",
        lazy: () => import("./encounter-act-consumable"),
      },
    ],
  },
];
