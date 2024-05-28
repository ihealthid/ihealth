import { createBrowserRouter } from "react-router-dom";
import { administratorRoutes } from "./pages/administrator/route";
import { pharmacyRoutes } from "./pages/pharmacy/route";
import { receptionistRoutes } from "./pages/reseptionist/route";
import { nurseRoutes } from "./pages/nurse/route";
import { doctorRoutes } from "./pages/doctor/route";
import { cashierRoutes } from "./pages/cashier/route";

const load = (...paths: (string | any | any[])[]) => ({
  path: paths[0],
  lazy: paths[1],
  children: paths[2] ?? [],
});

export const router = createBrowserRouter([
  load("/", () => import("./pages/login")),
  ...administratorRoutes,
  ...pharmacyRoutes,
  ...receptionistRoutes,
  ...nurseRoutes,
  ...doctorRoutes,
  ...cashierRoutes,
]);
