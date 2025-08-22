import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GameModesSection from "@/components/GameModesSection";
import TeamSection from "@/components/TeamSection";
import VotingSection from "@/components/VotingSection";
import DynmapSection from "@/components/DynmapSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="domu">
          <HeroSection />
        </section>
        <GameModesSection />
        <TeamSection />
        <VotingSection />
        <DynmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
