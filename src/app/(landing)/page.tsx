import FeaturesLanding from "./ui/FeaturesLanding";
import FooterLanding from "./ui/FooterLanding";
import HeroLanding from "./ui/HeroLanding";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <HeroLanding />
      <FeaturesLanding />
      <FooterLanding />
    </div>
  );
}
