"use client";

import { useEffect, useRef } from "react";

/**
 * The thin bone-on-graphite bar pinned to the bottom of every screen.
 * Updated directly on the element at most once per frame, so scrolling never
 * re-renders React.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(progress, 0.04)})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-40 h-0.5 bg-line">
      <div ref={bar} className="h-full origin-left bg-bone" style={{ transform: "scaleX(0.04)" }} />
    </div>
  );
}
