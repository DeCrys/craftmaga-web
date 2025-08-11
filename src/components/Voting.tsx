import { Vote, ExternalLink, Trophy, Coins } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const Voting = () => {
  const votingSites = [
    {
      name: "Czech-Craft",
      url: "https://czech-craft.eu",
      icon: Vote,
      description: "Nejpopulárnější český Minecraft portál",
      reward: "500 Coinů + 1x Klíč",
      gradient: "from-primary to-secondary"
    },
    {
      name: "Minecraft-list",
      url: "https://minecraft-list.cz",
      icon: Trophy,
      description: "Velký seznam českých serverů",
      reward: "300 Coinů + XP Boost",
      gradient: "from-secondary to-accent"
    },
    {
      name: "Servery-Minecraft",
      url: "https://servery-minecraft.cz",
      icon: Coins,
      description: "Přehled nejlepších MC serverů",
      reward: "400 Coinů + Rare Item",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-tr from-accent via-primary to-secondary" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hlasování
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Podpor náš server hlasováním a získej úžasné odměny! Hlasuj každý den na všech portálech.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl px-6 py-3 mb-8">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold text-primary">Denní hlasování = 1200+ Coinů!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {votingSites.map((site, index) => (
            <Card 
              key={index}
              className="glass-card hover-lift hover-glow group cursor-pointer border-border/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${site.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <site.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {site.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {site.description}
                </p>

                <div className="bg-muted/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Odměna za hlas:</p>
                  <p className="font-semibold text-primary">{site.reward}</p>
                </div>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${site.gradient} hover:scale-105 transition-all duration-300 text-white font-semibold`}
                  onClick={() => window.open(site.url, '_blank')}
                >
                  Hlasovat
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>

                {/* Decorative Element */}
                <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${site.gradient} transition-all duration-500 rounded-full mx-auto`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Týdenní Odměny
                </span>
              </h3>
              <p className="text-muted-foreground mb-4">
                Hlasuj 7 dní v řadě a získej bonus odměny!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-semibold text-primary">7 dní</p>
                  <p className="text-sm text-muted-foreground">Epic Klíč + 2000 Coinů</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <p className="font-semibold text-secondary">14 dní</p>
                  <p className="text-sm text-muted-foreground">Legendary Klíč + 5000 Coinů</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Voting;