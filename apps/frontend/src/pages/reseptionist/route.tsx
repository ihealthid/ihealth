import { Layout } from "@/components/layout";
import { PharmacyNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const receptionistRoutes: RouteObject[] = [
  {
    path: "/receptionist",
    element: <Layout navbar={<PharmacyNav />} />,
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
