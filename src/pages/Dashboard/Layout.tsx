import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import { ChartNoAxesColumnDecreasing } from "lucide-react";

export default function DashboardLayout() {
  return (
    <main className="flex flex-col h-screen w-full bg-bg">
      <section className="flex h-full w-full">
        <div className="flex flex-col h-full w-60 bg-white shadow-md">
          <div className="w-full flex items-center justify-center p-2 gap-2 relative">
            <img src="./logo.png" alt="logo" className="size-7 rounded-md" />
            <span className="font-medium">Gas Station</span>
            <ChartNoAxesColumnDecreasing className="size-6 cursor-pointer rotate-90 absolute right-0" />
          </div>
        </div>
        <div className="w-full h-full">
          <Navbar />
          <div className="w-full h-full p-4  overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
