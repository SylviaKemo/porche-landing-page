"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { PillarSection } from "@/components/sections/PillarSection";
import { CONTACT_HREF, pillars, type Pillar } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared grid so the fixed photo and the scrolling text line up exactly.
const GRID =
  "mx-auto grid w-full max-w-[1264px] grid-cols-[minmax(0,611fr)_minmax(0,463fr)] gap-[clamp(3rem,9.8vw,190px)]";
// Square photo frame: as wide as its column, but never taller than 70% of the screen.
const FRAME = "aspect-square w-full max-w-[min(611px,70svh)]";

const total = String(pillars.length).padStart(2, "0");

/**
 * Identity / Insight / Cohesion.
 *
 * >768px: one scene. The photo stays fixed on the left while the text column
 * on the right scrolls through the three pillars. As each new pillar's text
 * comes up, its photo grows out of the centre of the current one until it
 * fills the frame, and the blurred backdrop crossfades with it. Once the last
 * pillar is centred, the whole scene scrolls away.
 *
 * ≤768px: three separate full-screen sections (PillarSection).
 */
export function Pillars() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // GSAP only runs this when at least one condition matches, so the
        // phone size needs its own entry.
        {
          desk: "(min-width: 769px)",
          mobile: "(max-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desk, reduce } = ctx.conditions as { desk: boolean; reduce: boolean };

          const growFromZero = (target: gsap.TweenTarget, trigger: ScrollTrigger.Vars) =>
            reduce
              ? gsap.fromTo(target, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: trigger })
              : // Explicit from-values: the browser stores "inset(50% 50% 50% 50%)"
                // as "inset(50%)", which GSAP would only half-interpolate.
                gsap.fromTo(
                  target,
                  { clipPath: "inset(50% 50% 50% 50%)" },
                  { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut", scrollTrigger: trigger },
                );

          if (!desk) {
            if (reduce) return;

            // ≤768px: photos zoom with the scroll: out as you scroll down, back
            // in as you scroll up (1.3× entering → 1× leaving). The frame clips
            // the image, so only the picture moves.
            gsap.utils.toArray<HTMLElement>(".pillar-m-photo").forEach((photo) => {
              const img = photo.querySelector("img");
              if (!img) return;
              gsap.fromTo(
                img,
                { scale: 1.3 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            });

            // Headings light up letter by letter, left to right: dim grey,
            // a brief red tint, then white.
            gsap.utils.toArray<HTMLElement>(".pillar-m-title").forEach((title) => {
              gsap.fromTo(
                title.querySelectorAll(".pillar-m-char"),
                { color: "#3a3a3a" },
                {
                  keyframes: { color: ["#3a3a3a", "#c8102e", "#f2f0eb"] },
                  ease: "none",
                  stagger: 0.15,
                  scrollTrigger: { trigger: title, start: "top 85%", end: "top 55%", scrub: true },
                },
              );
            });
            return;
          }

          // >768px: the first photo grows from 0×0 as the scene comes on screen.
          growFromZero(".pillar-photo-0", {
            trigger: root.current,
            start: "top 80%",
            end: "top top",
            scrub: true,
          });

          gsap.utils.toArray<HTMLElement>(".pillar-row").forEach((row, i) => {
            if (i === 0) return; // handled above

            const scrollTrigger = {
              trigger: row,
              start: "top 85%", // next pillar's text starts coming up
              end: "top 15%", // ...and is almost centred: photo fully swapped
              scrub: true,
            };

            // Reduced motion: no box; photos crossfade instead (clip removed).
            if (reduce) gsap.set(`.pillar-photo-${i}`, { clipPath: "none" });
            growFromZero(`.pillar-photo-${i}`, scrollTrigger);

            gsap.set(`.pillar-bg-${i}`, { opacity: 0 });
            gsap.to(`.pillar-bg-${i}`, { opacity: 1, ease: "none", scrollTrigger });
          });
        },
      );
    },
    { scope: root },
  );

  return (
    // id="identity" is the menu's "Philosophy" target at every size.
    <section ref={root} id="identity" aria-label="Philosophy" className="relative">
      {/* ≤768px: a plain list of pillars on a solid dark background */}
      <div className="flex flex-col gap-16 bg-[#161616] px-6 pt-24 pb-20 desk:hidden">
        {pillars.map((p) => (
          <PillarSection key={p.id} pillar={p} total={pillars.length} />
        ))}
      </div>

      {/* >768px: one scene with a fixed photo and scrolling text */}
      <div className="relative hidden desk:block">
        {/* Fixed stage: blurred backdrops + photo frame */}
        <div className="sticky top-0 h-svh overflow-hidden bg-ink">
          {pillars.map((p, i) => (
            <Backdrop key={p.id} pillar={p} className={`pillar-bg-${i} ${i > 0 ? "opacity-0" : ""}`} />
          ))}

          <div className="relative flex h-full items-center px-6 pt-[84px]">
            <div className={GRID}>
              <div className={`relative ${FRAME}`}>
                {pillars.map((p, i) => (
                  <div
                    key={p.id}
                    className={`pillar-photo-${i} absolute inset-0`}
                    // Later photos start as a 0×0 box in the centre (set before JS loads).
                    style={i > 0 ? { clipPath: "inset(50% 50% 50% 50%)" } : undefined}
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 769px) 611px, 100vw"
                      className="object-cover"
                      style={{ objectPosition: p.objectPosition ?? "center" }}
                    />
                  </div>
                ))}
              </div>
              <div />
            </div>
          </div>
        </div>

        {/* Scrolling text column, one screen per pillar, laid over the stage */}
        <div className="relative z-10 -mt-[100svh]">
          {pillars.map((p) => (
            <div key={p.id} className="pillar-row flex h-svh items-center px-6 pt-[84px]">
              <div className={GRID}>
                <div aria-hidden="true" className={FRAME} />
                <PillarCopy pillar={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Backdrop({ pillar, className }: { pillar: Pillar; className: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0" style={{ background: pillar.gradient }} />
      <Image
        src={pillar.image}
        alt=""
        fill
        sizes="100vw"
        className="scale-110 object-cover blur-[24px] brightness-50"
        style={{ objectPosition: pillar.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}

function PillarCopy({ pillar }: { pillar: Pillar }) {
  return (
    <article aria-label={pillar.title} className="flex flex-col py-1">
      <p className="font-serif text-2xl leading-none">
        {pillar.index}
        <span className="text-mute"> / {total}</span>
      </p>
      <h2 className="mt-auto font-serif text-heading leading-none font-normal">{pillar.title}</h2>
      <p className="mt-6 max-w-[380px] text-body text-soft">{pillar.body}</p>
      <OutlineButton href={CONTACT_HREF} className="mt-auto self-start">
        Start your project
      </OutlineButton>
    </article>
  );
}
