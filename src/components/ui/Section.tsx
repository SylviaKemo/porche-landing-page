import type { ReactNode, Ref } from "react";

type SectionProps = {
  id?: string;
  label?: string;
  className?: string;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
};

/**
 * One full-screen "screen" from the design (1920×910 artboard slice).
 * Fluid: fills the viewport height, never shorter than its content.
 */
export function Section({ id, label, className = "", ref, children }: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      aria-label={label}
      className={`relative isolate flex min-h-svh w-full scroll-mt-0 overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
