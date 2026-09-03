import { Hero } from "@/components/home/Hero";
import { EmpathySection } from "@/components/home/EmpathySection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BasicsSection } from "@/components/home/BasicsSection";
import { CtaBand } from "@/components/home/CtaBand";
import { WhyPrepareSection } from "@/components/home/WhyPrepareSection";
import { PreparednessSection } from "@/components/home/PreparednessSection";
import { LifeMomentsSection } from "@/components/home/LifeMomentsSection";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EmpathySection />
      <WhyPrepareSection />
      <HowItWorks />
      <BasicsSection />
      <PreparednessSection />
      <LifeMomentsSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
