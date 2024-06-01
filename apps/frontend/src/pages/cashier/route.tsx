import { Layout } from "@/components/layout";
import { NavigationBar } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const cashierRoutes: RouteObject[] = [
  {
    path: "/cashier",
    element: <Layout navbar={<NavigationBar role="cashier" />} />,
    children: [
      {
        path: "payment",
        lazy: () => import("./payment"),
      },
      {
        path: "payment/:id",
        lazy: () => import("./payment-detail"),
      },
    ],
  },
];
