"use client";

import { getLenis } from "@/lib/lenis";
import { DEVELOPER } from "@/content/site";

/**
 * Small, quiet footer under the last section: copyright, a subtle
 * back-to-top button, and the developer credit.
 */
export function SiteFooter() {
  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink border-t border-white/[0.06] px-6 py-6 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 text-[11px] tracking-[0.04em] text-mute sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Forge. All rights reserved.</p>

        <button
          type="button"
          onClick={backToTop}
          className="group order-first flex min-h-11 items-center gap-2 tracking-[0.2em] uppercase transition-colors hover:text-bone sm:order-none"
        >
          Back to top
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path d="M6 10.5V1.5M2 5.5l4-4 4 4" />
          </svg>
        </button>

        <p>
          Developed by{" "}
          <a
            href={DEVELOPER.href}
            target={DEVELOPER.href.startsWith("http") ? "_blank" : undefined}
            rel={DEVELOPER.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone hover:decoration-bone/60"
          >
            {DEVELOPER.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
