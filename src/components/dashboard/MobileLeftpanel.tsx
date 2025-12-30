import { leftPanel_items } from "@/data/dashboard/leftPanel-items";
import CustomAvatar from "../CustomAvatar";
import LeftPanelBtn from "./LeftPanelBtn";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

interface IMobileLeftPanel {
  isShow: boolean;
  close: VoidFunction;
}
export default function MobileLeftpanel({ isShow, close }: IMobileLeftPanel) {
  const router = useNavigate();
  const session = useAppSelector((state) => state.user);
  return (
    <section
      className={`sm:hidden flex ms-auto items-start h-full  w-fit transition-transform duration-300  
      ${isShow ? "-translate-x-0" : "translate-x-full"}`}
    >
      <section className="flex flex-col justify-start items-start h-full w-60 bg-white">
        <div className="flex flex-col justify-center w-full items-center mt-2 relative">
          <X
            onClick={close}
            className="cursor-pointer absolute left-2 top-0 hover:bg-gray-200 p-1 rounded-full"
          />
          <CustomAvatar
            alt="profile pic"
            src="./avatar.png"
            className={`size-12 border rounded-md object-fill`}
          />
          <div className={`flex flex-col items-center`}>
            <strong>{session.name}</strong>
            <small>{session.role}</small>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex flex-col  w-full justify-center items-center">
          {leftPanel_items.map((linkItem) => {
            return (
              <LeftPanelBtn
                icon={linkItem.icon}
                label={linkItem.label}
                className={`justify-start `}
                onClick={() => router(linkItem.link)}
                location={linkItem.link}
                isShow={true}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
}
