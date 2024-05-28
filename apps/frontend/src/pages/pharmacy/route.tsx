import { Layout } from "@/components/layout";
import { PharmacyNav } from "@/components/navbar";
import { RouteObject } from "react-router-dom";

export const pharmacyRoutes: RouteObject[] = [
  {
    path: "/pharmacy",
    element: <Layout navbar={<PharmacyNav />} />,
    children: [
      {
        path: "brand",
        lazy: () => import("./brand"),
      },
      {
        path: "consumable",
        lazy: () => import("./consumable"),
      },
      {
        path: "consumable-stock",
        lazy: () => import("./consumable-stock"),
      },
      {
        path: "distributor",
        lazy: () => import("./distributor"),
      },
      {
        path: "ingredient",
        lazy: () => import("./ingredient"),
      },
      {
        path: "manufacture",
        lazy: () => import("./manufacture"),
      },
      {
        path: "medication",
        lazy: () => import("./medication"),
      },
      {
        path: "medication-ingredient/:medicationId",
        lazy: () => import("./medication-ingredient"),
      },
      {
        path: "medication-stock",
        lazy: () => import("./medication-stock"),
      },
      {
        path: "order",
        lazy: () => import("./order"),
      },
      {
        path: "order-add",
        lazy: () => import("./order-add"),
      },
      {
        path: "order-detail",
        lazy: () => import("./order-detail"),
      },
      {
        path: "procurement",
        lazy: () => import("./procurement"),
      },
    ],
  },
];
