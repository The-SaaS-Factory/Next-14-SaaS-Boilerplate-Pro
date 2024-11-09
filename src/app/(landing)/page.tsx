import FeaturesLanding from "./ui/FeaturesLanding";
import FooterLanding from "./ui/FooterLanding";
import HeroLanding from "./ui/HeroLanding";
import LandingPrices from "./ui/LandingPrices";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <HeroLanding />
      <FeaturesLanding />
      <LandingPrices />
      <FooterLanding />
    </div>
  );
}
