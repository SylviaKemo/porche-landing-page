"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, socialLinks } from "@/content/site";
import { ForgeMark, SocialIcon } from "@/components/ui/icons";

/**
 * Fixed header shown on every screen of the design: socials left,
 * Forge mark centred (with wordmark on the hero), NAVIGATE menu right.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[84px] items-center justify-between px-4 sm:px-8">
        <ul className="flex items-center gap-1.5 sm:gap-2">
          {socialLinks.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                aria-label={s.name}
                className="flex size-11 items-center justify-center opacity-90 transition-opacity hover:opacity-100"
              >
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="#top"
          aria-label="Forge — back to top"
          className="absolute top-[22px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
        >
          <ForgeMark />
          <span
            className={`text-[10px] font-bold tracking-[0.35em] transition-opacity duration-300 ${atTop ? "opacity-100" : "opacity-0"}`}
          >
            FORGE
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex min-h-11 items-center gap-3.5 text-[11px] font-bold tracking-[0.25em]"
        >
          <span className="hidden sm:inline">NAVIGATE</span>
          <span className="sr-only sm:hidden">Open menu</span>
          <span aria-hidden="true" className="relative block h-2.5 w-4 border-y border-bone">
            <span className="absolute inset-x-0 top-1 border-t border-bone" />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm"
      >
        <div className="flex h-[84px] items-center justify-end px-4 sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3.5 text-[11px] font-bold tracking-[0.25em]"
          >
            CLOSE
            <span aria-hidden="true" className="relative block size-4">
              <span className="absolute top-1/2 left-0 w-4 rotate-45 border-t border-bone" />
              <span className="absolute top-1/2 left-0 w-4 -rotate-45 border-t border-bone" />
            </span>
          </button>
        </div>
        <nav className="flex h-[calc(100%-84px)] items-center justify-center pb-[84px]">
          <ul className="flex flex-col items-center gap-2 text-center">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-5xl leading-tight text-bone/70 transition-colors hover:text-bone sm:text-7xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
