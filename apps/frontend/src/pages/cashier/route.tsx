import { Layout } from "@/components/layout";
import { CashierNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const cashierRoutes: RouteObject[] = [
  {
    path: "/cashier",
    element: <Layout navbar={<CashierNav />} />,
    children: [
      {
        path: "payment",
        lazy: () => import("./payment"),
      },
      {
        path: "payment-detail",
        lazy: () => import("./payment-detail"),
      },
    ],
  },
];
