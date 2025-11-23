import { leftPanel_items } from "@/data/dashboard/leftPanel-items";
import CustomAvatar from "../CustomAvatar";
import LeftPanelBtn from "./LeftPanelBtn";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

interface ILeftPanel {
  isShow: boolean;
}
export default function LeftPanel({ isShow }: ILeftPanel) {
  const router = useNavigate();
  const session = useAppSelector((state) => state.user);
  return (
    <section className="flex flex-col justify-center w-full ">
      <div className="flex flex-col justify-center w-full items-center">
        <CustomAvatar
          alt="profile pic"
          src="./avatar.png"
          className={`${
            isShow ? "size-16" : "size-8"
          }  border rounded-md object-fill`}
        />
        <div className={`${isShow ? "" : "hidden"} flex flex-col items-center`}>
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
              className={`${isShow ? "w-36 " : ""}justify-start `}
              onClick={() => router(linkItem.link)}
              location={linkItem.link}
              isShow={isShow}
            />
          );
        })}
      </div>
    </section>
  );
}
