import { ArrowRight, Sword, Users, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/minecraft-hero-bg.jpg";
import crafmagaLogo from "@/assets/crafmaga-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float blur-sm" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-accent/30 rounded-full animate-float animation-delay-2000 blur-sm" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-secondary/20 rounded-full animate-float animation-delay-4000 blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-muted/20 backdrop-blur-sm border border-border/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
          <img src={crafmagaLogo} alt="Crafmaga Logo" className="w-8 h-8" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CRAFMAGA</span>
        </div>

        <h1 className="hero-text mb-6 animate-slide-up">
          Minecraft Server
          <br />
          <span className="block">Pro Legendy</span>
        </h1>

        <div className="mb-8 animate-slide-up animation-delay-150">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl px-6 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-xl font-mono font-bold text-primary">play.crafmaga.cz</span>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up animation-delay-200">
          Připoj se k největšímu dobrodružství! Vytvárej, bojuj a objevuj nekonečné možnosti 
          v našem unikátním světě plném magie a legend.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up animation-delay-400">
          <Button 
            size="lg" 
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl hover-lift hover-glow transition-all duration-500"
          >
            <Sword className="mr-2 w-5 h-5" />
            Připojit se
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            className="glass-card px-8 py-6 text-lg font-semibold rounded-2xl hover-lift border-primary/20 hover:border-primary/40 bg-card/20"
          >
            <Users className="mr-2 w-5 h-5" />
            Komunita
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in animation-delay-600">
          {[
            { number: "500+", label: "Aktivních Hráčů" },
            { number: "50+", label: "Unikátních Módů" },
            { number: "3+", label: "Roky Online" },
            { number: "24/7", label: "Server Běží" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;