import { Layout } from "@/components/layout";
import { NavigationBar } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const receptionistRoutes: RouteObject[] = [
  {
    path: "/receptionist",
    element: <Layout navbar={<NavigationBar role="receptionist" />} />,
    children: [
      {
        path: "admission",
        lazy: () => import("./admission"),
      },
      {
        path: "patient",
        lazy: () => import("./patient"),
      },
    ],
  },
];
