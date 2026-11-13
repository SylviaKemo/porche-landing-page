"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ordinaryCars } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const carsTotalWidth = ordinaryCars.reduce((sum, car) => sum + car.width, 0);

/**
 * "Ordinary" → "Ends Here", as one held screen on the dark texture.
 *
 * - Start: "Ordinary" above the middle, the fronts of three large cars
 *   peeking in at the bottom of the screen.
 * - Scroll: the screen holds. The two black cars pull away first and drive
 *   off the top while the red one stays parked, then the red car follows,
 *   covering "Ordinary" (which hides once it's fully covered).
 * - Once the red car has cleared it, "Ends Here" fades up beneath it. The red
 *   car stops with just its rear showing at the top edge, the screen holds a
 *   moment, then the page carries on.
 *
 * The cars are top-down transparent cut-outs placed side by side
 * (`ordinaryCars` in site.ts: black, red, black).
 */
export function OrdinaryScene() {
  const track = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const group = track.current!.querySelector<HTMLElement>(".ord-cars")!;
        const red = group.querySelector<HTMLElement>(".ord-car-hold")!;
        const blacks = group.querySelectorAll<HTMLElement>(".ord-car-drive");
        const title = track.current!.querySelector<HTMLElement>(".ord-title")!;
        const ends = track.current!.querySelector<HTMLElement>(".ord-ends")!;
        const endsHeading = ends.querySelector<HTMLElement>("h2")!;
        const vh = () => window.innerHeight;

        // The line-up starts with its fronts peeking in at 72% of the screen
        // (the group's CSS `top`). Cars are moved from there; distances use
        // layout sizes, so they adapt to any screen and image size.
        const groupTop = () => group.offsetTop;
        const bottomOf = (el: HTMLElement) => groupTop() + el.offsetTop + el.offsetHeight;
        // Red car ends with just its rear showing (its bottom at 16% of the screen).
        const redEnd = () => vh() * 0.16 - bottomOf(red);
        // Black cars drive all the way off the top.
        const blackEnd = () => -40 - Math.max(...[...blacks].map(bottomOf));

        gsap.set(ends, { opacity: 0, y: 40 });
        let titleShown = true;
        let endsShown = false;

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: track.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
            // The headings follow the red car: "Ordinary" hides once the red
            // car fully covers it, "Ends Here" appears once the red car has
            // cleared it. Reverses when scrolling back.
            onUpdate: () => {
              const r = red.getBoundingClientRect();
              const showTitle = r.top > title.getBoundingClientRect().top;
              if (showTitle !== titleShown) {
                titleShown = showTitle;
                gsap.set(title, { opacity: showTitle ? 1 : 0 });
              }
              const showEnds = r.bottom < endsHeading.getBoundingClientRect().top - 24;
              if (showEnds !== endsShown) {
                endsShown = showEnds;
                gsap.to(ends, { opacity: showEnds ? 1 : 0, y: showEnds ? 0 : 40, duration: 0.5, overwrite: true });
              }
            },
          })
          // The black cars pull away first and leave the screen...
          .fromTo(blacks, { y: 0 }, { y: blackEnd, duration: 0.75 }, 0)
          // ...while the red car stays parked, then follows.
          .fromTo(red, { y: 0 }, { y: redEnd, duration: 0.5 }, 0.3)
          .to({}, { duration: 0.2 }); // brief hold on "Ends Here"
      });
    },
    { scope: track },
  );

  return (
    // 3 screens tall: the sticky stage holds for 2 screens of scrolling.
    <section ref={track} aria-label="Ordinary ends here" className="relative h-[300svh]">
      <div className="bg-texture sticky top-0 h-svh overflow-hidden">
        {/* Large screens: bigger headings (6.6% of the screen width, up to
            127px at 1920px), as in the reference. */}
        <h2 className="ord-title absolute inset-x-0 top-[36%] text-center font-serif text-heading leading-none font-normal desk:text-[clamp(3.75rem,6.6vw,8rem)]">
          Ordinary
        </h2>

        <div className="ord-ends absolute inset-x-0 top-[50%] px-6 text-center">
          <h2 className="font-serif text-heading leading-none font-normal desk:text-[clamp(3.75rem,6.6vw,8rem)]">
            Ends Here
          </h2>
          <p className="mx-auto mt-6 max-w-[400px] text-body text-dim">
            Complete expressions of taste, intent and individuality, shaped through detail,
            restraint and presence.
          </p>
        </div>

        {/* The cars: laid over both headings, centred, moved by the timeline. */}
        <div
          // Large, as in the reference: the line-up spans ~88% of a large
          // screen (red car ~27%), nearly the full width on phones.
          // Starts with the fronts peeking in at 72% of the screen.
          className="ord-cars absolute top-[72%] left-1/2 z-10 w-[96vw] -translate-x-1/2 desk:w-[min(88vw,1700px)]"
        >
          {/* Side by side at one scale: each car's width share matches its
              file's width, so their sizes stay true to each other. */}
          <div
            role="img"
            aria-label="Three cars seen from above: a red sports car between two black cars"
            className="flex items-center justify-between"
          >
            {ordinaryCars.map((car, i) => (
              <Image
                key={i}
                src={car.src}
                alt={car.alt}
                width={car.width}
                height={car.height}
                sizes="(min-width: 769px) 30vw, 33vw"
                className={`${car.hold ? "ord-car-hold" : "ord-car-drive"} h-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] will-change-transform`}
                style={{ width: `${(car.width / carsTotalWidth) * 96}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
