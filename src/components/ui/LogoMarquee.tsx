import Image from "next/image";
import type { Marque } from "@/content/site";

type LogoMarqueeProps = {
  items: Marque[];
  label: string;
  className?: string;
};

/**
 * Endless horizontal logo slider. The list is rendered twice side by side and
 * the track slides left by exactly one copy, so the loop is seamless.
 * Logos are forced white with a CSS filter. Pauses on hover; with reduced
 * motion it stops and the logos wrap instead.
 */
export function LogoMarquee({ items, label, className = "" }: LogoMarqueeProps) {
  // Each copy must be wider than the widest screen, or a gap shows at the end
  // of the loop; repeating the set keeps a copy at ~3000px.
  const set = [...items, ...items];

  const copy = (hidden: boolean) => (
    <ul
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[clamp(3rem,6vw,6rem)] pr-[clamp(3rem,6vw,6rem)] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6"
    >
      {set.map((m, i) => (
        // The repeat within the visible copy is decorative too.
        <li key={`${m.name}-${i}`} className="shrink-0" aria-hidden={i >= items.length || undefined}>
          <Image
            src={m.logo}
            alt={hidden || i >= items.length ? "" : m.name}
            width={240}
            height={180}
            className="h-[clamp(3rem,3.8vw,4.5rem)] w-auto opacity-85 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_85%,transparent)] motion-reduce:[mask-image:none] ${className}`}
    >
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-full">
        {copy(false)}
        <div className="contents motion-reduce:hidden">{copy(true)}</div>
      </div>
    </div>
  );
}
