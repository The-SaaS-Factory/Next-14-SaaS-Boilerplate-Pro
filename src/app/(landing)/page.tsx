import { HeroPattern } from "@/components/ui/commons/HeroPattern";
import FeatureGrid from "./ui/FeatureGrid";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <HeroPattern />
      <FeatureGrid />
      {/*  <SectionTab /> */}
    </div>
  );
}
