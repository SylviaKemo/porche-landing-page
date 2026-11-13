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
import { AvailableStock, FinalCta, PreviousBuilds } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      {/* z-[1]: the page sits above the menu, which is revealed by clipping it. */}
      <main className="relative z-[1]">
        <Hero />
        <Approach />
        <Pillars />
        <ServicesMotion>
          <ServicesIntro />
          <ServicesList />
        </ServicesMotion>
        <OrdinaryScene />
        {/* Closing sections stack as layers: each one slides up over the one
            before, which holds still (CSS sticky, so no scroll work). Pulled up
            one screen so Previous Builds slides over the end of the Ordinary
            scene too. Later layers paint on top of earlier ones. */}
        <div className="relative z-10 -mt-[100svh]">
          <div className="sticky top-0 shadow-[0_-40px_80px_rgba(0,0,0,0.6)]">
            <PreviousBuilds />
          </div>
          <div className="sticky top-0 shadow-[0_-40px_80px_rgba(0,0,0,0.6)]">
            <AvailableStock />
          </div>
          <div className="relative shadow-[0_-40px_80px_rgba(0,0,0,0.6)]">
            <FinalCta />
          </div>
        </div>
      </main>
      <ScrollProgress />
    </>
  );
}
