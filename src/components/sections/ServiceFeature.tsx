import Image from "next/image";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { LetterFill } from "@/components/ui/LetterFill";
import { CONTACT_HREF, type Service } from "@/content/site";

/**
 * One service at 768px and below: a full-screen section with its photo as a
 * darkened, full-bleed background and the copy over it. Larger screens use the
 * fixed-photo layout in ServicesList.
 *
 * `.svc-m-bg` is taller than the section (50% extra above and below) so
 * ServicesList can drift it slowly against the scroll: the photo looks almost
 * fixed while the section slides over it, and no edge ever shows.
 */
export function ServiceFeature({ service }: { service: Service }) {
  return (
    <section
      aria-label={service.title}
      className="svc-m relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-6 py-24"
    >
      <div aria-hidden="true" className="svc-m-bg absolute inset-x-0 -top-1/2 -bottom-1/2 -z-20 will-change-transform">
        <Image src={service.image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,11,0.75)_0%,rgba(11,11,11,0.55)_45%,rgba(11,11,11,0.8)_100%)]"
      />

      <p className="eyebrow">Service</p>
      <LetterFill
        text={service.title}
        className="mt-5 font-serif text-heading leading-none font-normal"
        start="top 85%"
        end="bottom 50%"
      />
      <p className="mt-6 max-w-[400px] text-body text-soft">{service.body}</p>
      <div className="mt-8 self-start">
        <OutlineButton href={CONTACT_HREF}>Start your project</OutlineButton>
      </div>
    </section>
  );
}
