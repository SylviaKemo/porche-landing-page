import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { CONTACT_HREF } from "@/content/site";

const display = "font-serif font-normal leading-none";

// "Ordinary" and "Ends Here" are one animated scene: see OrdinaryScene.tsx.

export function PreviousBuilds() {
  return (
    <Section
      id="builds"
      label="Previous builds"
      className="flex-col items-center justify-end bg-[#120305] px-4 pb-[clamp(5rem,22svh,200px)] text-center"
    >
      {/* Full bleed, focused on the car's front. The crop is set so the
          headlight lands in the upper part of the screen on wide screens,
          clear of the heading below. */}
      <Image
        src="/images/previous-builds-front.jpg"
        alt="Front of a red supercar in a dark studio, headlight lit"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[53%_53%]"
      />
      {/* Darkens the bottom so the heading and button read over the floor. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,11,0.25)_0%,rgba(11,11,11,0)_35%,rgba(11,11,11,0.55)_65%,rgba(11,11,11,0.9)_100%)]"
      />
      <h2 className={`${display} text-heading`}>Previous Builds</h2>
      <p className="mt-6 max-w-[400px] text-body text-soft">
        A collection of previous bespoke builds, shaped by craft, character and the people behind
        the wheel.
      </p>
      <OutlineButton href="#builds" className="mt-9 px-14">
        Explore builds
      </OutlineButton>
    </Section>
  );
}

export function AvailableStock() {
  return (
    <Section id="stock" label="Available stock" className="flex-col items-center bg-ink px-4 pt-[110px] text-center">
      {/* Dark ceiling behind the text at the top, the cars below it. */}
      <Image
        src="/images/stock-collection.jpg"
        alt="Five Porsche 918 Spyders parked in a dark, lit garage"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_45%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,11,0.55),rgba(11,11,11,0)_60%)]"
      />
      <h2 className={`${display} text-heading`}>Available Stock</h2>
      <p className="mt-6 max-w-[400px] text-body text-soft">
        Builds available for purchase, refined with intent, engineered with purpose, and ready to
        make a statement.
      </p>
      <OutlineButton href="#stock" className="mt-9 px-14">
        Browse stock
      </OutlineButton>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section id="start" label="Start your project" className="flex-col items-center justify-center bg-black px-4 py-28 text-center">
      <Image
        src="/images/cta-ocean.jpg"
        alt="Three cars parked facing the ocean"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[center_65%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.92),rgba(0,0,0,0.82)_50%,rgba(0,0,0,0.95))]"
      />
      <p className="eyebrow mb-6">Are you ready to</p>
      <h2 className={`${display} text-heading`}>
        Refuse
        <br />
        Ordinary
      </h2>
      <OutlineButton href={CONTACT_HREF} variant="accent" className="mt-11 px-14">
        Start your project
      </OutlineButton>
    </Section>
  );
}
