import { Crown, Shield, Wrench, Heart } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "DeCrys",
      role: "Majitel & Hlavní Developer",
      description: "Zakladatel serveru s 8 lety zkušeností v Minecraft administraci",
      avatar: "https://cravatar.eu/helmavatar/DeCrys/600.png",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      achievements: ["👑 Majitel serveru", "💎 Tvůrce webových stránek", "⚡ Plugin Developer"]
    },
    {
      name: "PriXx",
      role: "Hlavní Admin",
      description: "Hlavní správce serveru, dbá na fair-play a pomáhá hráčům",
      avatar: "https://cravatar.eu/helmavatar/PRIXX/600.png",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      achievements: ["🛡️ Hlavní Admin", "👥 Vedoucí komunity", "📋 Manažer akcí"]
    },
    {
      name: "Vianoce",
      role: "Technický specialista",
      description: "Expert na servery a modifikace, udržuje server v top kondici",
      avatar: "https://cravatar.eu/helmavatar/Vianoce/600.png",
      icon: Wrench,
      color: "from-purple-500 to-pink-500",
      achievements: ["⚙️ Technik", "🔧 Tvůrce pluginů", "🚀 Optimalizátor serveru"]
    },
    {
      name: "patrikvl488",
      role: "Helper",
      description: "Pomáhá hráčům, odpovídá na dotazy a dohlíží na pořádek na serveru.",
      avatar: "https://cravatar.eu/helmavatar/patrikvl488/600.png",
      icon: Heart,
      color: "from-pink-500 to-red-500",
      achievements: ["🛡️ Aktivní pomocník", "💬 Poradce hráčů", "🎯 Dozor na serveru"]
    }
  ];

  return (
    <section id="tym" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Náš Tým</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Lidé Za Serverem</span>
          </h2>
          
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Poznejte náš dedikovaný tým, který se stará o to, aby byl váš zážitek co nejlepší
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div
                key={member.name}
                className="group card-glass text-center relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animation: 'slide-in-up 0.8s ease-out both'
                }}
              >
                {/* Role Icon */}
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.color} p-1.5 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative mb-6 pt-4">
                  <div className="relative mx-auto w-24 h-24 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-2xl minecraft-block border-2 border-glass-border"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    
                    {/* Online Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${member.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>

                {/* Member Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Achievements */}
                <div className="space-y-1">
                  {member.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="text-xs glass px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {achievement}
                    </div>
                  ))}
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-[var(--radius-lg)] border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="card-glass text-center">
            <div className="text-2xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-xs text-foreground/60">Server</div>
          </div>
          <div className="card-glass text-center">
            <div className="text-2xl font-bold gradient-text mb-1">8+</div>
            <div className="text-xs text-foreground/60">Let zkušeností</div>
          </div>
          <div className="card-glass text-center">
            <div className="text-2xl font-bold gradient-text mb-1">1000+</div>
            <div className="text-xs text-foreground/60">Vyřešených problémů</div>
          </div>
          <div className="card-glass text-center">
            <div className="text-2xl font-bold gradient-text mb-1">99%</div>
            <div className="text-xs text-foreground/60">Spokojenost</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;