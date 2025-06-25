import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoadingProps {
  className?: string;
}
export default function Loading({ className }: LoadingProps) {
  return <LoaderCircle className={cn("animate-spin size-8", className)} />;
}
