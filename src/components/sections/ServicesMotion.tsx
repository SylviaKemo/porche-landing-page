import type { ReactNode } from "react";

/**
 * Backdrop for the Services intro and the services. The texture is fixed to
 * the screen (background-attachment: fixed), so the left side stays still
 * while each service's text and the photos on the right scroll up past it.
 * Every service sits on this one backdrop, so it reads as a single panel.
 * (Phone browsers that ignore fixed backgrounds simply scroll the texture.)
 */
export function ServicesMotion({ children }: { children: ReactNode }) {
  return <div className="bg-texture bg-fixed">{children}</div>;
}
