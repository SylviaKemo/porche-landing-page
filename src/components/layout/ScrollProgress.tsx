"use client";

import { useEffect, useState } from "react";

/** The thin bone-on-graphite bar pinned to the bottom of every screen. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 z-40 h-0.5 bg-line"
    >
      <div
        className="h-full origin-left bg-bone"
        style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
      />
    </div>
  );
}
