"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INTRO_START = 0.25; // seconds before the first word starts
const INTRO_STAGGER = 0.14; // seconds between words

const delay = (seconds: number) => ({ "--intro-delay": `${seconds}s` }) as CSSProperties;

type WordsProps = {
  lines: string[];
  /** Class on each word's outer span, driven by the GSAP scroll timeline. */
  className: string;
  /** Play the CSS load-in reveal on each word's inner span. */
  intro?: boolean;
};

/**
 * Renders each line as a block and each word as two nested spans: the outer
 * one belongs to the scroll animation, the inner one to the load-in reveal,
 * so the two animations can never overwrite each other.
 */
function Words({ lines, className, intro = false }: WordsProps) {
  let index = 0;
  return lines.map((line, i) => (
    <span key={i} className="block">
      {line.split(" ").map((word, j, all) => {
        const wordDelay = INTRO_START + index++ * INTRO_STAGGER;
        return (
          <span key={j} className={`${className} inline-block will-change-[transform,filter,opacity]`}>
            <span
              className={intro ? "intro-reveal inline-block" : "inline-block"}
              style={intro ? delay(wordDelay) : undefined}
            >
              {word}
              {j < all.length - 1 && " "}
            </span>
          </span>
        );
      })}
    </span>
  ));
}

const hidden = { opacity: 0, y: 40, filter: "blur(14px)" };
const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Hero stage: the textured backdrop stays pinned while the typography
 * changes, from the hero headline to the manifesto, as the visitor scrolls.
 * The headline's load-in reveal is pure CSS (see `.intro-reveal` in
 * globals.css), so it plays from the first paint, before JavaScript loads.
 */
export function Hero() {
  const stage = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".w2", hidden);

        // Scroll: pin the stage and swap the headline for the manifesto.
        gsap
          .timeline({
            defaults: { immediateRender: false },
            scrollTrigger: {
              // No `pin`: pinning re-wraps the section in the DOM, which restarts
              // the CSS load-in reveal. The stage is held by CSS `sticky` instead.
              trigger: stage.current,
              start: "top top",
              end: "+=150%", // the last screen of the track is left for Approach to cover the stage
              // Lenis already smooths the scroll, so follow it exactly (no extra lag).
              scrub: true,
              // Never rest between the two headlines: settle on a complete one.
              snap: {
                snapTo: "labelsDirectional",
                duration: { min: 0.4, max: 0.9 },
                delay: 0.1,
                ease: "power2.inOut",
              },
            },
          })
          .addLabel("headline")
          .fromTo(
            ".w1",
            shown,
            { opacity: 0, y: -40, filter: "blur(14px)", duration: 0.6, stagger: 0.06, ease: "power2.in" },
          )
          .fromTo(".hero-tag", { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "none" }, "<")
          .fromTo(".w2", hidden, { ...shown, duration: 0.6, stagger: 0.06, ease: "power3.out" }, ">")
          // No hold: Approach starts taking over as soon as the manifesto is complete.
          .addLabel("manifesto");
      });

      // The track's last screen, while Approach takes over the stage.
      const coverTrigger = () => ({
        trigger: stage.current,
        start: () => `top+=${window.innerHeight * 1.5} top`,
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      });

      // ≤768px: Approach slides up over the stage, which recedes (slight
      // shrink and fade to black) for depth.
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
        gsap
          .timeline({ defaults: { ease: "none", immediateRender: false }, scrollTrigger: coverTrigger() })
          .fromTo(".hero-stage", { scale: 1 }, { scale: 0.92 })
          .fromTo(".hero-shade", { opacity: 0 }, { opacity: 0.65 }, "<");
      });

      // >768px: Approach opens as a growing box in the middle of the stage, so
      // the manifesto blurs away first, leaving only the texture around the box.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
        gsap
          .timeline({ defaults: { ease: "none", immediateRender: false }, scrollTrigger: coverTrigger() })
          .fromTo(".manifesto", { opacity: 1, filter: "blur(0px)" }, { opacity: 0, filter: "blur(10px)", duration: 0.35 })
          .fromTo(".hero-shade", { opacity: 0 }, { opacity: 0.25, duration: 1 }, 0);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".w2", { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage.current,
              start: "top top",
              end: "+=150%",
              scrub: true,
            },
          })
          .to([".w1", ".hero-tag"], { opacity: 0, ease: "none" })
          .to(".w2", { opacity: 1, ease: "none" });
      });
    },
    { scope: stage },
  );

  return (
    // Tall scroll track: 1 screen + 1.5 screens of scroll for the headline swap
    // + 1 screen during which Approach takes over the stage (it overlaps that
    // last screen; see Approach.tsx for how it reveals at each breakpoint).
    // The inner stage sticks to the viewport while the track scrolls past.
    <section id="top" ref={stage} aria-label="Introduction" className="relative h-[350svh]">
      <div className="hero-stage bg-texture sticky top-0 h-svh min-h-[640px] overflow-hidden">
        <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[5vw] text-center">
          <h1 className="font-serif text-display leading-[1.02] font-normal">
            <Words className="w1" intro lines={["For Those Who", "Refuse Ordinary"]} />
          </h1>
          <p className="hero-tag absolute inset-x-0 bottom-14 px-4 text-body text-bone">
            <span
              className="intro-reveal intro-reveal--soft inline-block"
              // The tagline starts one beat after the headline's 5th (last) word.
              style={delay(INTRO_START + 6 * INTRO_STAGGER)}
            >
              A luxury automotive atelier for bespoke styling, performance and craftsmanship.
            </span>
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[5vw] text-center">
          <h2 className="manifesto font-serif text-heading leading-[1.05] font-normal">
            <Words className="w2 opacity-0" lines={["We Don’t Modify Vehicles", "We Build Them For You"]} />
          </h2>
        </div>
      </div>
    </section>
  );
}
