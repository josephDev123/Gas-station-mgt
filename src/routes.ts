import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/client/Index";
import NotFound from "./pages/client/NotFound";
import DashboardLayout from "./components/dashboard/Layout";
import DashboardIndex from "./pages/Dashboard/Index/page";
import Fuel from "./pages/Dashboard/fuel/page";
import Pump from "./pages/Dashboard/pump/page";
import Customer from "./pages/Dashboard/customer/page";
import Expenses from "./pages/Dashboard/expenses/page";
import Analysis from "./pages/Dashboard/analysis/page";
import Auth from "./pages/client/Auth";
// import ProtectedUserDashboard from "./components/dashboard/ProtectedUserDashboard";
import { protectedUserDashboard } from "./loader/protectUserDashboardLoader";
import EmployeePage from "./pages/Dashboard/employee/page";
import FuelToPumpPage from "./pages/Dashboard/AssignFuelToPump/page";
import FuelPumpPage from "./pages/Dashboard/FuelPump/page";
import NozzlePage from "./pages/Dashboard/nozzle/page";
import NozzleToUserPage from "./pages/Dashboard/nozzleToUser/page";
import SalePage from "./pages/Dashboard/Sale/page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Index,
  },

  {
    path: "/auth",
    Component: Auth,
  },

  {
    // Component: ProtectedUserDashboard,
    loader: () => protectedUserDashboard,
    children: [
      {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardIndex },
          { path: "fuel", Component: Fuel },
          { path: "pump", Component: Pump },
          { path: "assign-fuel-to-pump", Component: FuelToPumpPage },
          { path: "assign-fuel-pump", Component: FuelPumpPage },
          { path: "nozzle", Component: NozzlePage },
          { path: "employee", Component: EmployeePage },
          { path: "nozzle-user", Component: NozzleToUserPage },
          { path: "sale", Component: SalePage },
          { path: "customer", Component: Customer },
          { path: "expenses", Component: Expenses },
          { path: "analysis", Component: Analysis },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
