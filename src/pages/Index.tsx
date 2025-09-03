import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GameModesSection } from "@/components/GameModesSection";
import { VotingSection } from "@/components/VotingSection";
import { ShopSection } from "@/components/ShopSection";
import { TeamSection } from "@/components/TeamSection";
import { DynmapSection } from "@/components/DynmapSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GameModesSection />
      <VotingSection />
      <ShopSection />
      <TeamSection />
      <DynmapSection />
      <Footer />
    </div>
  );
};

export default Index;