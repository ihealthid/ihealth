import { Layout } from "@/components/layout";
import { NavigationBar } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const nurseRoutes: RouteObject[] = [
  {
    path: "/nurse",
    element: <Layout navbar={<NavigationBar role="nurse" />} />,
    children: [
      {
        path: "waiting-list",
        lazy: () => import("./waiting-list"),
      },
      {
        path: "observation/:id",
        lazy: () => import("./observation"),
      },
    ],
  },
];
