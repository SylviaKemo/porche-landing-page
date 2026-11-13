import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { LetterFill } from "@/components/ui/LetterFill";
import { CONTACT_HREF } from "@/content/site";

/** Services intro, on solid black (the services below use the fixed backdrop). */
export function ServicesIntro() {
  return (
    <Section
      id="services"
      label="Services"
      className="flex-col gap-12 bg-ink px-6 pt-28 pb-16 sm:px-[9vw] lg:flex-row lg:items-start lg:justify-between lg:gap-[6vw] lg:pt-0 lg:pb-0"
    >
      <div className="max-w-[1000px] lg:pt-[clamp(8rem,18.7svh,170px)] lg:pb-16">
        <LetterFill
          text="A vehicle should say something before it moves. Every line, material, and finish is considered."
          className="font-serif text-heading leading-[1.04] font-normal"
          start="top 80%"
          end="bottom 40%"
          // Phones: one word per line.
          wordClassName="max-[768px]:block"
        />
        <p className="mt-10 max-w-[480px] text-body text-dim">
          Our services are shaped with intent, from exterior styling and interior refinement to
          performance upgrades, detailing and bespoke finishes; each detail sharpens the
          vehicle’s character without overpowering it.
        </p>
        <div className="mt-10">
          <OutlineButton href={CONTACT_HREF}>Start your project</OutlineButton>
        </div>
      </div>

      {/* Hidden on phones, where the services' own photos follow straight after. */}
      <div className="relative aspect-[452/676] w-full max-[768px]:hidden max-w-[452px] shrink-0 overflow-hidden lg:h-[74svh] lg:w-[23.5vw] lg:max-w-none lg:aspect-auto">
        <Image
          src="/images/services-steering.jpg"
          alt="Porsche steering wheel crest"
          fill
          sizes="(min-width: 1024px) 24vw, 100vw"
          className="object-cover will-change-transform"
        />
      </div>
    </Section>
  );
}
