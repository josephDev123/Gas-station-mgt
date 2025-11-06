import { Bell } from "lucide-react";
import { Dot } from "lucide-react";
import CustomAvatar from "../CustomAvatar";
import { Menu } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

interface INavbar {
  mobileLeftPanelToggle: VoidFunction;
}
export default function Navbar({ mobileLeftPanelToggle }: INavbar) {
  const navigate = useNavigate();
  const session = useAppSelector((state) => state.user);
  return (
    <section className=" flex items-center justify-between gap-3 bg-white p-4">
      <span className={`sm:hidden inline-flex items-center gap-2`}>
        <img src="./logo.png" alt="logo" className="size-7 rounded-md" />
        <span className="font-medium text-sm">GS</span>
      </span>

      <div className="flex items-center gap-4  justify-end ms-auto">
        <IoHome
          onClick={() => navigate("/")}
          className="sm:size-6 size-4 cursor-pointer"
        />
        <div className="relative inline-flex cursor-pointer hover:text-black/90">
          <Bell className="sm:size-6 size-4" />
          <Dot className="absolute -left-0 -top-2.5 size-9 text-red-300" />
        </div>
        <div className="flex items-center gap-2">
          <span className="truncate text-ellipsis max-w-40">
            {session.name}
          </span>
          <CustomAvatar
            alt="logo"
            src={"./avatar.png"}
            className="border-2 object-cover sm:size-10 size-6"
          />
        </div>
        <Menu
          onClick={mobileLeftPanelToggle}
          className="sm:hidden block cursor-pointer hover:bg-gray-200 p-1 rounded-full"
        />
      </div>
    </section>
  );
}
