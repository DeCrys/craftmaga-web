import { Sword, Pickaxe, Shield, Crown, Zap, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Sword,
      title: "PvP Arény",
      description: "Epické souboje v profesionálně navržených arénách s unikátními pravidly a odměnami.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: Pickaxe,
      title: "Survival Svět",
      description: "Obrovský survival svět s vlastními dungeony, bossmi a skrytými poklady čekajícími na objevení.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: Shield,
      title: "Vlastní Města",
      description: "Vytvoř si vlastní město, pozvi přátele a spravuj svou říši s pokročilým town systémem.",
      gradient: "from-accent to-primary"
    },
    {
      icon: Crown,
      title: "Ranking Systém",
      description: "Získávej zkušenosti, leveluj svou postavu a získej prestižní tituly a výhody.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Zap,
      title: "Custom Módy",
      description: "Unikátní módy a pluginy vytvořené speciálně pro Crafmaga server.",
      gradient: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Aktivní Komunita",
      description: "Připoj se k přátelské komunitě hráčů, účastni se eventů a soutěží o úžasné ceny.",
      gradient: "from-accent to-secondary"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Herní Módy
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Objevuj nekonečné možnosti na našem serveru s unikátními herními módy a funkcemi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="glass-card hover-lift hover-glow group cursor-pointer border-border/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative Element */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;