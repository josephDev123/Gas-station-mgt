import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/Dashboard/Layout";
import DashboardIndex from "./pages/Dashboard/Index/page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Index,
  },

  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [{ index: true, Component: DashboardIndex }],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
