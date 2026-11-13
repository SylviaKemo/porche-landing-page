import type { ReactNode } from "react";

/**
 * Backdrop for the Services intro and the services. The texture stays still
 * on screen while each service's text and the photos scroll up past it, and
 * every service sits on this one backdrop, so it reads as a single panel.
 *
 * Done with a `position: fixed` layer clipped to this wrapper
 * (`clip-path: inset(0)`) rather than `background-attachment: fixed`: the
 * browser can move a fixed layer on the GPU, whereas a fixed background forces
 * a full repaint on every scroll frame. It also works on phones that ignore
 * fixed backgrounds.
 */
export function ServicesMotion({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate [clip-path:inset(0)]">
      <div aria-hidden="true" className="bg-texture pointer-events-none fixed inset-0 -z-10" />
      {children}
    </div>
  );
}
