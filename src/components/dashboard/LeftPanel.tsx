import { LayoutDashboard } from "lucide-react";
import CustomAvatar from "../CustomAvatar";
import LeftPanelBtn from "./LeftPanelBtn";
import { useNavigate } from "react-router-dom";

export default function LeftPanel() {
  const router = useNavigate();
  return (
    <section className="flex flex-col justify-center w-full">
      <div className="flex flex-col justify-center w-full items-center">
        <CustomAvatar
          alt="profile pic"
          src="./avatar.png"
          className="size-16 border rounded-md object-fill"
        />
        <div className="flex flex-col items-center">
          <strong>Name</strong>
          <small>Role</small>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-col  w-full ">
        <LeftPanelBtn
          icon={<LayoutDashboard className="size-4" />}
          label="Dashboard"
          onClick={() => router("dashboard")}
        />
      </div>
    </section>
  );
}
