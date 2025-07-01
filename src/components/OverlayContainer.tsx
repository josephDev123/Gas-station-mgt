import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export default function OverlayContainer({
  children,
  className,
  show,
  close,
  shouldRender,
}: {
  children: ReactNode;
  className?: string;
  show: boolean;
  close: VoidFunction;
  shouldRender: boolean; //animate purpose
}) {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id == "overlay") {
      close();
    }
  };

  return (
    shouldRender && (
      <section
        id="overlay"
        onClick={handleClose}
        className={cn(
          `fixed inset-0 h-full  w-full transition-opacity  ease-in-out duration-300 z-50 ${
            show
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`,
          className
        )}
      >
        {children}
      </section>
    )
  );
}
