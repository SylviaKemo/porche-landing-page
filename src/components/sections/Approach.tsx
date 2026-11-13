"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { CONTACT_HREF, marques } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Our Approach" takes over from the hero stage, which it overlaps.
 *
 * - ≤768px: the section slides up over the hero (it overlaps the hero track's
 *   last screen). Its photo settles from a slight zoom and its content rises
 *   into place.
 * - >768px: the section sticks in place over the hero and opens as a box
 *   that grows from 0×0 at the centre until it covers the whole screen. The content stays
 *   full-size inside; the box just reveals more of it. Its track overlaps the
 *   hero's last screen, then holds the full section for one more screen.
 *
 * Everything is scrubbed to the scroll.
 */
export function Approach() {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
        const scrollTrigger = {
          trigger: section.current,
          start: "top bottom", // section's top edge enters the bottom of the screen
          end: "top top", // section has fully covered the hero
          scrub: true,
        };

        gsap.fromTo(".approach-photo", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger });
        gsap.fromTo(
          ".approach-rise",
          { y: 140, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", stagger: 0.12, scrollTrigger },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
        const scrollTrigger = {
          trigger: track.current,
          start: "top top", // the manifesto has just finished
          end: "+=100%", // box fills the screen one screen of scroll later
          scrub: true,
        };

        // The box starts at 0×0 in the centre, so the section is invisible
        // until the scroll reaches it, then grows to cover the screen.
        // Applied immediately (not on the next frame) so it can never flash open.
        gsap.set(section.current, { clipPath: "inset(50% 50% 50% 50%)" });
        gsap
          .timeline({ defaults: { ease: "power1.inOut" }, scrollTrigger })
          .fromTo(
            section.current,
            { clipPath: "inset(50% 50% 50% 50%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
            0,
          )
          .fromTo(".approach-photo", { scale: 1.2 }, { scale: 1, duration: 1 }, 0);
      });

      // Reduced motion, large screens: no growing box, just a crossfade.
      mm.add("(prefers-reduced-motion: reduce) and (min-width: 769px)", () => {
        gsap.fromTo(
          section.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: track.current, start: "top top", end: "+=100%", scrub: true },
          },
        );
      });
    },
    { scope: track },
  );

  return (
    // Scroll track. ≤768px: just the section, pulled up over the hero's last
    // screen. >768px: 3 screens tall, pulled up 2 screens so the sticky section
    // appears over the hero exactly as the manifesto finishes.
    <div ref={track} className="relative z-10 -mt-[100svh] desk:-mt-[200svh] desk:h-[300svh]">
      {/* Menu link target: where the section is fully revealed at each size. */}
      <div id="approach" aria-hidden="true" className="absolute top-0 desk:top-[100svh]" />
      <Section
        ref={section}
        label="Our approach"
        className="flex-col bg-[linear-gradient(90deg,#120E0C_0%,#1C1613_45%,#0B0908_100%)] px-6 pt-[clamp(8rem,16.5svh,150px)] pb-16 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] sm:px-[9.4vw] desk:sticky desk:top-0 desk:h-svh desk:shadow-none"
      >
        <div className="approach-photo absolute inset-0 -z-20 will-change-transform">
          <Image
            src="/images/approach-craftsman.jpg"
            alt="Craftsman grinding a restored metal body"
            fill
            sizes="100vw"
            className="object-cover object-[center_70%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,9,8,0.85)_0%,rgba(11,9,8,0.55)_50%,rgba(11,9,8,0.7)_100%)]"
        />

        <h2 className="font-serif text-heading leading-[1.02] font-normal">
          <span className="approach-rise block">Our Approach</span>
          <span className="approach-rise block">To Every Build</span>
        </h2>

        {/* Bottom row: logo slider bleeding in from the left edge, copy + CTA
            on the right (stacked at 768px and below). */}
        <div className="mt-auto flex flex-col gap-10 pt-16 desk:flex-row desk:items-start desk:gap-[4vw]">
          <LogoMarquee
            items={marques}
            label="Marques we work with"
            className="approach-rise -mx-6 sm:-mx-[9.4vw] desk:mr-0 desk:min-w-0 desk:flex-1"
          />
          <div className="approach-rise max-w-[440px] desk:w-[clamp(18rem,24vw,26rem)] desk:shrink-0">
            <p className="text-body">
              Every decision is intentional, every detail has purpose based on your taste, your
              lifestyle, and your standards.
            </p>
            <OutlineButton href={CONTACT_HREF} className="mt-7">
              Start your project
            </OutlineButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
