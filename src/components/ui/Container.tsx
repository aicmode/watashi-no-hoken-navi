import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const width =
    size === "sm" ? "max-w-2xl" : size === "lg" ? "max-w-6xl" : "max-w-4xl";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
