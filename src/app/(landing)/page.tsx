import { HeroPattern } from "@/components/ui/commons/HeroPattern";
import FeatureGrid from "./ui/FeatureGrid";
import PricingFrontend from "./ui/PricingFrontend";
import CustomCTAService from "./ui/CustomCTAService";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative ">
      <HeroPattern />
      <FeatureGrid />
      <PricingFrontend />
      <CustomCTAService />
    </div>
  );
}
