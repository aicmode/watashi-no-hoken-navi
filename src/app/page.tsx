import { Hero } from "@/components/home/Hero";
import { EmpathySection } from "@/components/home/EmpathySection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BasicsSection } from "@/components/home/BasicsSection";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EmpathySection />
      <HowItWorks />
      <BasicsSection />
      <CtaBand />
    </>
  );
}
