import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-all duration-200 ease-out active:translate-y-px active:scale-[0.985] disabled:opacity-50 " +
  "disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_12px_28px_-12px_rgba(25,92,199,0.78)] " +
    "hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_18px_36px_-14px_rgba(25,92,199,0.82)]",
  secondary:
    "bg-surface text-ink border border-line shadow-[0_8px_20px_-16px_rgba(13,27,47,0.55)] hover:-translate-y-0.5 hover:border-brand/35 hover:bg-brand-soft/45",
  ghost: "text-brand hover:bg-brand-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-[0.95rem] sm:px-8 sm:py-4 sm:text-base",
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
