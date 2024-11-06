import { HeroPattern } from "@/components/ui/commons/HeroPattern";
import FeatureGrid from "./ui/FeatureGrid";
import PlansComponent from "../(admin)/home/(all)/settings/billing/buyPlan/ui/BuyPlan";
import PricingFrontend from "./ui/PricingFrontend";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <HeroPattern />
      <FeatureGrid />
      {/*  <SectionTab /> */}
      <PricingFrontend />
    </div>
  );
}
