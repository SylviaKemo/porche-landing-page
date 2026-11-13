import Image from "next/image";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { CONTACT_HREF, type Pillar } from "@/content/site";

type PillarSectionProps = { pillar: Pillar; total: number };

/**
 * One pillar as a block in the phone list: number, square photo, heading,
 * copy and button on a plain dark background. Used at 768px and below;
 * larger screens use the combined scene in Pillars.
 *
 * Animated in Pillars:
 * - .pillar-m-photo img: zooms out as you scroll down, back in as you scroll up.
 * - .pillar-m-char: the heading's letters light up one by one on scroll.
 */
export function PillarSection({ pillar, total }: PillarSectionProps) {
  return (
    <article aria-label={pillar.title} className="flex flex-col">
      <p className="font-serif text-2xl leading-none">
        {pillar.index}
        <span className="text-mute"> / {String(total).padStart(2, "0")}</span>
      </p>

      <div className="pillar-m-photo relative mt-5 aspect-square w-full overflow-hidden">
        <Image
          src={pillar.image}
          alt={pillar.alt}
          fill
          sizes="100vw"
          className="object-cover will-change-transform"
          style={{ objectPosition: pillar.objectPosition ?? "center" }}
        />
      </div>

      <h2
        aria-label={pillar.title}
        className="pillar-m-title mt-9 font-serif text-heading leading-none font-normal"
      >
        {[...pillar.title].map((ch, i) => (
          <span key={i} aria-hidden="true" className="pillar-m-char">
            {ch}
          </span>
        ))}
      </h2>
      <p className="mt-4 text-body text-soft">{pillar.body}</p>
      <OutlineButton href={CONTACT_HREF} className="mt-6 self-start">
        Start your project
      </OutlineButton>
    </article>
  );
}
