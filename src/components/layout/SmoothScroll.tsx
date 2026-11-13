"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth (inertial) scrolling driven by GSAP's ticker so pinned,
 * scrubbed ScrollTrigger animations stay in lockstep with the scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    // lerp 0.12: still smooth, but catches up with the wheel faster than the
    // previous 0.08, which felt floaty and slow.
    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
