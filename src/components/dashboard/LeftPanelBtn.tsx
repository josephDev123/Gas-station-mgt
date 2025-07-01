import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface NavBtnProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  location: string;
  isShow?: boolean;
}

export default function LeftPanelBtn({
  icon,
  label,
  onClick,
  className,
  location,
  isShow,
  ...props
}: NavBtnProps) {
  const locationObj = useLocation();
  const pathname = `${locationObj.pathname}${locationObj.search}`;
  // console.log("curr", pathname);
  // console.log("location", location);
  // console.log(pathname === location);

  return (
    <div
      className={`${
        pathname === location && "bg-[#242487]"
      } flex flex-col w-full justify-center items-center hover:bg-[#9999f1]`}
    >
      <button
        title={label}
        {...props}
        onClick={onClick}
        className={cn(
          ` ${
            pathname === location ? "text-white" : "text-black/80"
          }  px-4 py-2 hover:text-white  w-full text-center flex items-center justify-center gap-2`,
          className
        )}
      >
        {icon} {isShow && label}
      </button>
    </div>
  );
}
