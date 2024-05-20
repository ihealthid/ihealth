import { createBrowserRouter } from "react-router-dom";

const load = (...paths: (string | any | any[])[]) => ({
  path: paths[0],
  lazy: paths[1],
  children: paths[2] ?? [],
});

export const router = createBrowserRouter([
  load("/login", () => import("./pages/login")),
  {
    path: "/",
    lazy: () => import("./components/layout"),
    children: [
      load("/encounter-act", () => import("./pages/encounter-act")),
      load("/admission", () => import("./pages/admission")),
      load("/appointment", () => import("./pages/appointment")),
      load("/area", () => import("./pages/area")),
      load(
        "/classification-disease",
        () => import("./pages/classification-disease"),
      ),

      load("/healthcare-service", () => import("./pages/healthcare-service")),
      load("/marital-status", () => import("./pages/marital-status")),
      load("/encounter-status", () => import("./pages/encounter-status")),
      load("/patient-condition", () => import("./pages/patient-condition")),

      // load('/dashboard', 'dashboard'),
      load("/diagnose/:id", () => import("./pages/diagnose")),

      load("/manufacture", () => import("./pages/manufacture")),
      load("/brand", () => import("./pages/brand")),
      load("/consumable", () => import("./pages/consumable")),
      load("/consumable/:id/stock", () => import("./pages/consumable-stock")),
      load("/medication", () => import("./pages/medication")),
      load("/medication-stock/:id", () => import("./pages/medication-stock")),
      load("/order", () => import("./pages/order")),
      load("/order-add/:id", () => import("./pages/order-add")),
      load("/order-detail/:id", () => import("./pages/order-detail")),
      load("/patient", () => import("./pages/patient")),
      load("/payment", () => import("./pages/payment")),
      load("/payment/:id", () => import("./pages/payment-detail")),
      load("/role", () => import("./pages/role")),
      load("/observation/:id", () => import("./pages/observation")),
      load("/user", () => import("./pages/user")),
      load("/waiting-list", () => import("./pages/waiting-list")),
      load(
        "/participant-type-code",
        () => import("./pages/participant-type-code"),
      ),
    ],
  },
]);
