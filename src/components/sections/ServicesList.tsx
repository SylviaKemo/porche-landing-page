"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { LetterFill } from "@/components/ui/LetterFill";
import { ServiceFeature } from "@/components/sections/ServiceFeature";
import { CONTACT_HREF, services } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The six services.
 *
 * >768px: the photo panel on the right stays fixed for the whole run while
 * the text on the left scrolls up over the still backdrop, one screen per
 * service. As each service's text comes up, its photo wipes up from the
 * bottom over the current one and settles from a slight zoom. The page
 * snaps so it always rests on one service. Titles light up letter by letter.
 *
 * ≤768px: one full-screen section per service (ServiceFeature) with its photo
 * as a darkened background that drifts slowly, so it looks almost fixed while
 * the section slides over it. Same letter-by-letter titles.
 */
export function ServicesList() {
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desk: "(min-width: 769px)",
          mobile: "(max-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desk, reduce } = ctx.conditions as { desk: boolean; reduce: boolean };

          if (!desk) {
            // ≤768px: each service's background photo drifts down as the
            // section scrolls up, so it looks almost fixed while the section
            // slides over it (it moves at about half the page's speed). The
            // layer is 200% of the section's height (50% extra each side), so
            // ±25% of it is ±50% of the section.
            if (reduce) return;
            gsap.utils.toArray<HTMLElement>(".svc-m").forEach((section) => {
              gsap.fromTo(
                section.querySelector(".svc-m-bg"),
                { yPercent: -25 },
                {
                  yPercent: 25,
                  ease: "none",
                  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            });
            return;
          }

          const rows = gsap.utils.toArray<HTMLElement>(".svc-row");

          rows.forEach((row, i) => {
            if (i === 0) return; // the first photo is showing from the start
            const scrollTrigger = { trigger: row, start: "top bottom", end: "top top", scrub: true };
            const photo = `.svc-photo-${i}`;

            if (reduce) {
              // Reduced motion: a plain crossfade instead of the wipe.
              gsap.set(photo, { clipPath: "none" });
              gsap.fromTo(photo, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger });
              return;
            }

            // Next photo wipes up from the bottom over the current one...
            gsap.fromTo(
              photo,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger },
            );
            // ...and settles from a slight zoom while it does.
            gsap.fromTo(`${photo} img`, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger });
          });

          // Rest on one service at a time.
          if (!reduce && rows.length > 1) {
            ScrollTrigger.create({
              trigger: scroller.current,
              start: "top top",
              end: "bottom bottom",
              snap: {
                snapTo: 1 / (rows.length - 1),
                duration: { min: 0.25, max: 0.6 },
                delay: 0.08,
                ease: "power1.inOut",
              },
            });
          }
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ≤768px: stacked blocks */}
      <div className="desk:hidden">
        {services.map((s) => (
          <ServiceFeature key={s.id} service={s} />
        ))}
      </div>

      {/* >768px: scrolling text on the left, fixed photo panel on the right */}
      <div ref={scroller} className="relative hidden grid-cols-2 desk:grid">
        <div>
          {services.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-label={s.title}
              className="svc-row flex h-svh flex-col justify-center px-[9vw] pt-[84px]"
            >
              <p className="eyebrow">Service</p>
              <LetterFill
                text={s.title}
                className="mt-6 font-serif text-heading leading-none font-normal"
                start="top 85%"
                end="bottom 50%"
              />
              <p className="mt-8 max-w-[400px] text-body text-soft">{s.body}</p>
              <div className="mt-10 self-start">
                <OutlineButton href={CONTACT_HREF}>Start your project</OutlineButton>
              </div>
            </section>
          ))}
        </div>

        <div className="sticky top-0 h-svh self-start overflow-hidden">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`svc-photo-${i} absolute inset-0 overflow-hidden`}
              // Later photos start fully clipped from the top (set before JS loads).
              style={i > 0 ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="50vw"
                className="object-cover will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
