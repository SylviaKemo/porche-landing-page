export function ForgeMark({ className = "" }: { className?: string }) {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" aria-hidden="true" className={className}>
      <path d="M2 22 L20 2 L38 22 L30 22 L20 11 L10 22 Z" fill="currentColor" />
    </svg>
  );
}

export type SocialIconName = "linkedin" | "instagram" | "circle";

/** The three small social glyphs from the design's header. */
export function SocialIcon({ name }: { name: SocialIconName }) {
  switch (name) {
    case "linkedin":
      return (
        <span
          aria-hidden="true"
          className="flex size-4 items-center justify-center rounded-[2px] bg-bone text-[10px] leading-none font-semibold text-ink"
        >
          in
        </span>
      );
    case "instagram":
      return (
        <span aria-hidden="true" className="block size-4 rounded-[4px] border-2 border-bone" />
      );
    case "circle":
      return <span aria-hidden="true" className="block size-4 rounded-full bg-bone" />;
  }
}
