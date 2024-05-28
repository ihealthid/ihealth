import { Layout } from "@/components/layout";
import { NurseNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const nurseRoutes: RouteObject[] = [
  {
    path: "/nurse",
    element: <Layout navbar={<NurseNav />} />,
    children: [
      {
        path: "waiting-list",
        lazy: () => import("./waiting-list"),
      },
    ],
  },
];
