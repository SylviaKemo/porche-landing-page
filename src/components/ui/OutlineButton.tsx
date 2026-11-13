import Link from "next/link";
import type { ComponentProps } from "react";

type OutlineButtonProps = ComponentProps<typeof Link> & {
  variant?: "outline" | "accent";
};

/**
 * The site's call-to-action button: frosted glass with light glints that
 * travel around the border and spread to light the whole outline on hover.
 * The effect lives in `.glass-btn` in globals.css.
 */
export function OutlineButton({
  variant = "outline",
  className = "",
  children,
  ...props
}: OutlineButtonProps) {
  return (
    <Link
      className={`glass-btn inline-flex min-h-11 items-center justify-center px-9 py-4 text-[10px] font-bold tracking-[0.22em] text-bone uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone ${variant === "accent" ? "glass-btn--accent" : ""} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
