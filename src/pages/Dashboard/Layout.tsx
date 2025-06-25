import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
import LeftPanel from "@/components/dashboard/Leftpanel";

export default function DashboardLayout() {
  return (
    <main className="flex flex-col h-screen w-full bg-bg">
      <section className="flex h-full w-full">
        {/* left  panel */}
        <div className="flex flex-col h-full w-80 bg-white  drop-shadow-md">
          <div className="w-full flex items-center justify-between px-3 py-5 gap-2 sticky top-0 ">
            <span className="inline-flex items-center gap-2">
              <img src="./logo.png" alt="logo" className="size-7 rounded-md" />
              <span className="font-medium">Gas Station</span>
            </span>

            <ChartNoAxesColumnDecreasing className="size-6 cursor-pointer rotate-90 hover:text-black/70" />
          </div>
          <hr />
          <div className="flex flex-col justify-center items-center py-3 w-full overflow-y-auto ">
            <LeftPanel />
          </div>
        </div>
        <div className="w-full h-full">
          <Navbar />
          <div className="w-full h-fit p-4  overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
