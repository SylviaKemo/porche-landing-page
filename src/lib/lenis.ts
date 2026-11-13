import type Lenis from "lenis";

/**
 * The page's single Lenis (smooth scroll) instance, set by SmoothScroll, so
 * other components can pause scrolling or jump to a section (e.g. the menu).
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
