import FeaturesLanding from "./ui/FeaturesLanding";
import HeroLanding from "./ui/HeroLanding";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
        <HeroLanding />
      <FeaturesLanding />
    </div>
  );
}
