import { ComponentType, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import LogOutModal from "../commons/LogOutModal";
import { useAppDispatch } from "@/lib/redux/hooks";
import { unsetUser } from "@/lib/redux/slices/User";
import { useNavigate } from "react-router-dom";

interface IDropDownProfileAndLogoutHOC<T> {
  Component: ComponentType<T & {}>;
  className?: T;
}

export default function DropDownProfileAndLogoutHOC<T>({
  Component,
  className,
}: IDropDownProfileAndLogoutHOC<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(unsetUser());
    navigate("/");
  };
  return (
    <main className={`relative flex flex-col ${className}`}>
      <section className="inline-flex gap-3 items-center">
        <Component {...className} />
        <RiArrowDropDownLine
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </section>

      {isOpen && (
        <section className="flex flex-col space-y-2 z-40 absolute top-11 right-0 ">
          <Link
            to="/dashboard/profile"
            type="button"
            className="border rounded-md py-0.5 px-4 bg-green-400 text-white w-full"
          >
            Profile
          </Link>

          <button
            onClick={() => setIsDeleteOpen(true)}
            type="button"
            className="border rounded-md py-0.5 px-4 bg-red-400  w-full"
          >
            Logout
          </button>
        </section>
      )}

      <LogOutModal
        open={isDeleteOpen}
        setOpen={() => setIsDeleteOpen(false)}
        action={logout}
        heading={<h5 className="text-center">Confirm Logout</h5>}
        desc="You’re about to log out of your account. Any unsaved changes may be lost."
      />
    </main>
  );
}
