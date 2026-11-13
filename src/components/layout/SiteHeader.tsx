"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLenis } from "@/lib/lenis";
import {
  CONTACT_HREF,
  CONTACT_PHONE,
  menuLegalLinks,
  menuLinks,
  socialLinks,
} from "@/content/site";
import { ForgeMark, PhoneIcon, SocialIcon } from "@/components/ui/icons";

gsap.registerPlugin(useGSAP);

/**
 * Fixed header + full-screen menu.
 *
 * Header: phones show a call button on the left; larger screens show the
 * social icons. Forge mark in the centre, menu toggle on the right (the lines
 * turn into an × while the menu is open).
 *
 * Menu (as in the reference): the page itself is clipped into a box that
 * closes in on the centre of the screen, revealing the deep red menu behind
 * it; the large links then sharpen in from a blur. Closing reverses it. Picking
 * a link jumps to its section while the page is hidden, so the page reopens
 * already there.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const applyClip = useRef<() => void>(() => {});

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const main = document.querySelector("main");
      const menu = menuRef.current;
      if (!main || !menu) return;

      // Clip the page to the visible screen, shrunk towards the centre by
      // `p` (0 = full screen, 0.5 = nothing left). Written in the page's own
      // coordinates, so it tracks wherever the page is scrolled to.
      const state = { p: 0 };
      applyClip.current = () => {
        if (state.p <= 0) {
          main.style.clipPath = "";
          return;
        }
        const r = main.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = state.p * vw;
        const top = -r.top + state.p * vh;
        const bottom = r.bottom - vh + state.p * vh;
        main.style.clipPath = `inset(${top}px ${x}px ${bottom}px ${x}px)`;
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      timeline.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => {
            main.style.clipPath = "";
            gsap.set(menu, { visibility: "hidden" });
          },
        })
        .set(menu, { visibility: "visible" }, 0)
        .to(state, { p: 0.5, duration: 0.9, ease: "power3.inOut", onUpdate: applyClip.current }, 0)
        .fromTo(
          ".menu-link",
          { opacity: 0, y: 24, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out", stagger: 0.07 },
          0.4,
        )
        .fromTo(".menu-foot", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.75);

      // Reduced motion: same states, near-instant.
      if (reduce) timeline.current.timeScale(6);

      const onResize = () => applyClip.current();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: menuRef },
  );

  // Play / reverse, pause the page scroll while open, keyboard handling.
  useEffect(() => {
    const tl = timeline.current;
    const lenis = getLenis();
    if (!tl) return;

    if (open) {
      lenis?.stop();
      tl.timeScale(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 6 : 1).play();
      const focusFirst = window.setTimeout(
        () => menuRef.current?.querySelector<HTMLAnchorElement>(".menu-link")?.focus(),
        450,
      );
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(focusFirst);
        window.removeEventListener("keydown", onKey);
      };
    }

    if (tl.progress() > 0) {
      // Close a little quicker than it opens.
      tl.timeScale(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 6 : 1.4).reverse();
      lenis?.start();
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  // Jump to the section while the page is clipped away, then close.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || href === "#") return; // placeholder links
    e.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    const lenis = getLenis();
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView();
    }
    applyClip.current();
    setOpen(false);
  };

  const callHref = CONTACT_PHONE ? `tel:${CONTACT_PHONE}` : CONTACT_HREF;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-3 sm:h-[84px] sm:px-8">
        {/* Phones: call button. */}
        <a
          href={callHref}
          aria-label={CONTACT_PHONE ? "Call Forge" : "Contact Forge"}
          className="flex size-11 items-center justify-center desk:hidden"
        >
          <PhoneIcon />
        </a>

        {/* Larger screens: social icons. */}
        <ul className="hidden items-center gap-1 desk:flex">
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
          className="absolute top-[16px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:top-[22px]"
        >
          <ForgeMark className="h-5 w-[34px] sm:h-6 sm:w-10" />
          <span
            className={`text-[9px] font-bold tracking-[0.35em] transition-opacity duration-300 sm:text-[10px] ${atTop || open ? "opacity-100" : "opacity-0"}`}
          >
            FORGE
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex min-h-11 min-w-11 items-center justify-end gap-3.5 text-[11px] font-bold tracking-[0.25em]"
        >
          <span aria-hidden="true" className="hidden desk:inline">
            {open ? "CLOSE" : "NAVIGATE"}
          </span>
          {/* Three lines that turn into an × while open. */}
          <span aria-hidden="true" className="relative block h-3 w-[18px]">
            <span
              className={`absolute inset-x-0 top-0 border-t border-bone transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 top-[5.5px] border-t border-bone transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 border-t border-bone transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </header>

      {/* Sits behind the page (main is z-[1]); revealed as the page is
          clipped away. Hidden (not focusable) while closed. */}
      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-lenis-prevent
        className="menu-bg invisible fixed inset-0 z-0 flex flex-col items-center justify-center px-6"
      >
        <nav aria-label="Main">
          <ul className="flex flex-col items-center text-center">
            {menuLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  className="menu-link block font-serif text-[clamp(3rem,12.5vw,7.5rem)] leading-[1.02] font-normal text-bone uppercase transition-colors duration-300 hover:text-bone/60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-foot mt-8 flex flex-col items-center gap-6 desk:mt-10">
          <ul className="flex gap-8 font-serif text-[11px] tracking-[0.06em] text-soft uppercase">
            {menuLegalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="inline-block py-2 transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="flex size-11 items-center justify-center text-bone transition-opacity hover:opacity-70"
                >
                  <SocialIcon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
