import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
import LeftPanel from "@/components/dashboard/LeftPanel";
import { useEffect, useState } from "react";
import MobileLeftpanel from "@/components/dashboard/MobileLeftpanel";
import OverlayContainer from "@/components/OverlayContainer";
import { images } from "@/utils/images";

export default function DashboardLayout() {
  const [isShow, setShow] = useState(true);
  const [isMobileLeftPanel, setMobileLeftPanel] = useState(false);
  const [shouldRender, setShouldRender] = useState(isShow);

  const handleToggleMobileLeftPanel = () => {
    setMobileLeftPanel((prev) => !prev);
  };

  useEffect(() => {
    if (isShow) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isShow]);

  return (
    <main className="flex flex-col h-screen w-full bg-bg">
      <section className="flex h-full w-full">
        {/* left  panel */}
        <div
          className={`${
            isShow ? "w-80" : "w-16"
          } sm:flex flex-col hidden h-full  transition-[width] duration-300 ease-in-out overflow-hidden  bg-white  drop-shadow-md`}
        >
          <div
            className={`w-full  flex items-center justify-between px-3 py-5 gap-2 sticky top-0`}
          >
            <span
              className={`${
                isShow ? "" : "hidden"
              } inline-flex items-center gap-2`}
            >
              <img src={images.logo} alt="logo" className="size-7 rounded-md" />
              <span className="font-medium">Gas Station</span>
            </span>

            <ChartNoAxesColumnDecreasing
              onClick={() => setShow((prev) => !prev)}
              className="size-6 cursor-pointer rotate-90 hover:text-black/70"
            />
          </div>
          <hr />
          <div className="flex flex-col justify-center items-center py-3 w-full overflow-y-auto  ">
            <LeftPanel isShow={isShow} />
          </div>
        </div>
        <div className="w-full h-full overflow-x-auto">
          <Navbar mobileLeftPanelToggle={handleToggleMobileLeftPanel} />
          <OverlayContainer
            show={isMobileLeftPanel}
            close={handleToggleMobileLeftPanel}
            shouldRender={shouldRender}
          >
            <MobileLeftpanel
              isShow={isMobileLeftPanel}
              close={handleToggleMobileLeftPanel}
            />
          </OverlayContainer>

          <div className="w-full h-fit p-4  overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
