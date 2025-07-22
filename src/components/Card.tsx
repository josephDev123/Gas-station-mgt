import { cn } from "@/lib/utils";

interface CardProps {
  title?: string | React.ReactNode;
  description?: string;
  //   imageUrl?: string;
  children?: React.ReactNode;
  className?: string;
  styleTitle?: string;
  styleDescription?: string;
}

export default function Card({
  title,
  description,
  //   imageUrl,
  className,
  styleTitle,
  styleDescription,
  children,
}: CardProps) {
  return (
    <section
      className={`${cn(
        "flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg",
        className
      )}`}
    >
      <h1 className={`${cn("text-lg font-bold", styleTitle)}`}>{title}</h1>
      <p className={`${cn("text-sm ", styleDescription)}`}>{description}</p>
      {children}
    </section>
  );
}
