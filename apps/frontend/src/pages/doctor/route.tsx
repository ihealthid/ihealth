import { Layout } from "@/components/layout";
import { NavigationBar } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const doctorRoutes: RouteObject[] = [
  {
    path: "/doctor",
    element: <Layout navbar={<NavigationBar role="doctor" />} />,
    children: [
      {
        path: "appointment",
        lazy: () => import("./appointment"),
      },
      {
        path: "diagnose/:id",
        lazy: () => import("./diagnose"),
      },
      {
        path: "medication",
        lazy: () => import("./medication"),
      },
    ],
  },
];
