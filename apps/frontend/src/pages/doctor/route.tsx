import { Layout } from "@/components/layout";
import { DoctorNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const doctorRoutes: RouteObject[] = [
  {
    path: "/doctor",
    element: <Layout navbar={<DoctorNav />} />,
    children: [
      {
        path: "appointment",
        lazy: () => import("./appointment"),
      },
      {
        path: "dianose",
        lazy: () => import("./diagnose"),
      },
    ],
  },
];
