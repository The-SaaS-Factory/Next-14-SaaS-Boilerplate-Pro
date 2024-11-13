import FeaturesLanding from "./ui/FeaturesLanding";
import HeroLanding from "./ui/HeroLanding";
import LandingPrices from "./ui/LandingPrices";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <HeroLanding />
      <FeaturesLanding />
      <LandingPrices />
    </div>
  );
}
