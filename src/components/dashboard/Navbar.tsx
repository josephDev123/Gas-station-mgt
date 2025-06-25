import { Bell } from "lucide-react";
import { Dot } from "lucide-react";
import CustomAvatar from "../CustomAvatar";

export default function Navbar() {
  return (
    <section className=" flex items-center justify-end bg-white p-4">
      <div className="flex items-center gap-4 ">
        <div className="relative inline-flex cursor-pointer hover:text-black/90">
          <Bell className="" />
          <Dot className="absolute -left-0 -top-2.5 size-9 text-red-300" />
        </div>
        <div className="flex items-center gap-2">
          <span>Role Name</span>
          <CustomAvatar
            alt="logo"
            src={"./avatar.png"}
            className="border-2 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
