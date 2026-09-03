import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-all duration-200 active:scale-[0.98] disabled:opacity-50 " +
  "disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_28px_-12px_rgba(31,86,214,0.75)] " +
    "hover:bg-brand-deep hover:shadow-[0_14px_34px_-12px_rgba(31,86,214,0.8)]",
  secondary:
    "bg-surface text-ink border border-line hover:border-brand/40 hover:bg-brand-soft/50",
  ghost: "text-brand hover:bg-brand-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-4 text-base sm:text-[1.05rem]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </Link>
  );
}
