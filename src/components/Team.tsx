import { Shield, Crown, Hammer, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Team = () => {
  const teamMembers = [
    {
      name: "CrafMaster",
      role: "Vlastník & Zakladatel",
      icon: Crown,
      description: "Vizionář a líder, který Crafmaga vybudoval od základů.",
      gradient: "from-primary to-secondary",
      avatar: "🤴"
    },
    {
      name: "BuilderPro",
      role: "Hlavní Builder",
      icon: Hammer,
      description: "Architekt úžasných staveb a herních arén na serveru.",
      gradient: "from-secondary to-accent",
      avatar: "🏗️"
    },
    {
      name: "AdminGuard",
      role: "Senior Admin",
      icon: Shield,
      description: "Dohlíží na pořádek a pomáhá hráčům s problémy.",
      gradient: "from-accent to-primary",
      avatar: "🛡️"
    },
    {
      name: "EventMaster",
      role: "Event Manager",
      icon: Star,
      description: "Organizuje epické eventy a soutěže pro komunitu.",
      gradient: "from-primary to-accent",
      avatar: "⭐"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-bl from-secondary via-primary to-accent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Náš Tým
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Poznej lidi, kteří dělají Crafmaga nejlepším Minecraft serverem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="glass-card hover-lift hover-glow group cursor-pointer border-border/20 animate-fade-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${member.gradient} p-3 -mt-6 border-4 border-background group-hover:scale-110 transition-transform duration-300`}>
                    <member.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-primary font-semibold mb-3">
                  {member.role}
                </p>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>

                {/* Decorative Element */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${member.gradient} transition-all duration-500 rounded-full mx-auto`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;