import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/client/Index";
import NotFound from "./pages/client/NotFound";
import DashboardLayout from "./components/dashboard/Layout";
import DashboardIndex from "./pages/Dashboard/Index/page";
import Fuel from "./pages/Dashboard/fuel/page";
import Pump from "./pages/Dashboard/pump/page";
import Task from "./pages/Dashboard/task/page";
import Sale from "./pages/Dashboard/sale/page";
import Customer from "./pages/Dashboard/customer/page";
import Expenses from "./pages/Dashboard/expenses/page";
import Analysis from "./pages/Dashboard/analysis/page";
import Auth from "./pages/client/Auth";
import ProtectedUserDashboard from "./components/dashboard/ProtectedUserDashboard";
import { protectedUserDashboard } from "./loader/protectUserDashboardLoader";
import EmployeePage from "./pages/Dashboard/employee/page";
import FuelToPumpPage from "./pages/Dashboard/AssignFuelToPump/page";

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
          { path: "employee", Component: EmployeePage },
          { path: "task", Component: Task },
          { path: "sale", Component: Sale },
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
