import { cn } from "@/lib/utils";
import Loading from "./Loading";
import { useState } from "react";
import { error } from "console";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export default function CustomAvatar({
  src,
  alt,
  className,
  ...props
}: AvatarProps) {
  const [status, setStatus] = useState({ loading: true, error: false });
  return (
    <section className="relative ">
      {status.loading && <Loading className="absolute inset-0 m-auto" />}
      {status.error && (
        <small className="flex flex-col items-center justify-center size-12 rounded-full border-2 text-red-500 text-xs text-center">
          Image failed
        </small>
      )}
      <img
        onLoad={() => setStatus({ ...status, loading: false })}
        onError={() => setStatus({ loading: false, error: true })}
        onLoadStart={() => setStatus({ loading: true, error: false })}
        {...(status.error
          ? { style: { display: "none" } } // Hide image while error
          : { style: { display: "block" } })}
        {...props}
        src={src}
        alt={alt}
        sizes=""
        loading="lazy"
        className={cn("size-10 rounded-full", className)}
      />
    </section>
  );
}
