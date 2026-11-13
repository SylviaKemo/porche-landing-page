"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LetterFillProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ScrollTrigger start/end for the fill (heading position on screen). */
  start?: string;
  end?: string;
  /** Extra classes on each word, e.g. to put one word per line on phones. */
  wordClassName?: string;
};

/**
 * Heading that lights up letter by letter as you scroll: each letter starts
 * dim grey, passes through red, and ends white, left to right. Tied to the
 * scroll, so scrolling back up drains it again.
 *
 * Letters are grouped per word so lines still wrap between words.
 */
export function LetterFill({
  text,
  as: Tag = "h2",
  className = "",
  start = "top 85%",
  end = "bottom 45%",
  wordClassName = "",
}: LetterFillProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".lf-char",
          { color: "#3a3a3a" },
          {
            keyframes: { color: ["#3a3a3a", "#c8102e", "#f2f0eb"] },
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start, end, scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className={wordClassName}>
          <span className="whitespace-nowrap">
            {[...word].map((ch, c) => (
              <span key={c} className="lf-char">
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
