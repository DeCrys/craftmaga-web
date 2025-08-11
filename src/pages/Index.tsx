import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Voting from "@/components/Voting";
import DynMap from "@/components/DynMap";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen custom-scrollbar">
      <Navigation />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="team">
          <Team />
        </section>
        
        <section id="voting">
          <Voting />
        </section>
        
        <section id="dynmap">
          <DynMap />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/src/assets/crafmaga-logo.png" alt="Crafmaga Logo" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CRAFMAGA
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Crafmaga Server. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
