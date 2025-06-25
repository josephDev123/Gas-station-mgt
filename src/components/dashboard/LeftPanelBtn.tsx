import { LayoutDashboard } from "lucide-react";
import { ReactNode } from "react";

interface NavBtnProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export default function LeftPanelBtn({
  icon,
  label,
  onClick,
  ...props
}: NavBtnProps) {
  const pathName = "";

  return (
    <button
      {...props}
      onClick={() => onClick}
      className="px-4 py-2  focus:bg-[#242487] hover:bg-[#9999f1] hover:text-white text-black/80 w-full text-center flex items-center justify-center gap-2"
    >
      {icon} {label}
    </button>
  );
}
