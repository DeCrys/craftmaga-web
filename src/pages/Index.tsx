import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GameModesSection from "@/components/GameModesSection";
import TeamSection from "@/components/TeamSection";
import VotingSection from "@/components/VotingSection";
import ShopSection from "@/components/ShopSection";
import DynmapSection from "@/components/DynmapSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        // malý timeout, aby se počkalo na render sekcí
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="domu">
          <HeroSection />
        </section>
        <section id="mody">
          <GameModesSection />
        </section>
        <section id="tym">
          <TeamSection />
        </section>
        <section id="hlasovani">
          <VotingSection />
        </section>
        <section id="dynmap">
          <DynmapSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
