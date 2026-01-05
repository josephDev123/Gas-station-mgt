import { ComponentType, CSSProperties, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface IDropDownProfileAndLogoutHOC<T> {
  Component: ComponentType<T & {}>;
  className?: T;
}

export default function DropDownProfileAndLogoutHOC<T>({
  Component,
  className,
}: IDropDownProfileAndLogoutHOC<T>) {
  const [isOpen, setIsOpen] = useState(false);
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
          <button
            type="button"
            className="border rounded-md py-0.5 px-4 bg-green-400 text-white w-full"
          >
            Profile
          </button>

          <button
            type="button"
            className="border rounded-md py-0.5 px-4 bg-red-400  w-full"
          >
            Logout
          </button>
        </section>
      )}
    </main>
  );
}
