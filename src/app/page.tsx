import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Pillars } from "@/components/sections/Pillars";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { ServicesList } from "@/components/sections/ServicesList";
import { ServicesMotion } from "@/components/sections/ServicesMotion";
import { OrdinaryScene } from "@/components/sections/OrdinaryScene";
import { AvailableStock, FinalCta } from "@/components/sections/Closing";
// import { PreviousBuilds } from "@/components/sections/Closing"; // disabled, see below

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>
        <Hero />
        <Approach />
        <Pillars />
        <ServicesMotion>
          <ServicesIntro />
          <ServicesList />
        </ServicesMotion>
        <OrdinaryScene />
        {/* Disabled for now. To bring back: uncomment this and the import above,
            and the "Previous Builds" link in navLinks (content/site.ts). */}
        {/* <PreviousBuilds /> */}
        <AvailableStock />
        <FinalCta />
      </main>
      <ScrollProgress />
    </>
  );
}
