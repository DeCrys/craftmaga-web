"use client";

import { 
  Sword, 
  Castle, 
  Zap, 
  Crown, 
  Shield, 
  Gamepad2,
  ArrowRight 
} from "lucide-react";
import { useEffect, useState } from "react";

const GameModesSection = () => {
  const dynmapBaseUrl = "http://54.36.113.186:25417";
  const corsProxy = "https://api.allorigins.win/raw?url=";

  const initialGameModes = [
    {
      icon: Crown,
      title: "Spawn",
      description: "Vytvoř si své království a ovládni celý server",
      color: "from-purple-500 to-pink-600",
      featured: false,
      world: "spawn",
    },
    {
      icon: Sword,
      title: "Survival",
      description: "Klasický Minecraft survival s vlastními rozšířeními a ekonomikou",
      color: "from-green-500 to-emerald-600",
      featured: true,
      world: "playworld",
    },
    {
      icon: Shield,
      title: "SkyBlock",
      description: "Přežij na malém ostrůvku a rozšiř ho do nekonečna",
      color: "from-yellow-500 to-amber-600",
      featured: true,
      world: "skyblock",
    },
    {
      icon: Castle,
      title: "Creative",
      description: "Neomezené stavění s WorldEdit a vlastními příkazy",
      color: "from-blue-500 to-cyan-600",
      featured: false,
      world: "creative",
    },
    {
      icon: Zap,
      title: "PvP Arena",
      description: "Intenzivní souboje v různých arenách s unikátními zbraněmi",
      color: "from-red-500 to-orange-600",
      featured: true,
      world: "pvp",
    },
    {
      icon: Gamepad2,
      title: "Mini Games",
      description: "Zábavné mini hry s přáteli - Hide & Seek, Spleef a další",
      color: "from-indigo-500 to-purple-600",
      featured: false,
      world: "minigames",
    }
  ];

  const [gameModes, setGameModes] = useState(initialGameModes);
  const [playerCounts, setPlayerCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const counts: Record<string, number> = {};
      for (const mode of initialGameModes) {
        try {
          const url = `${dynmapBaseUrl}/up/world/${mode.world}/`;
          const res = await fetch(`${corsProxy}${encodeURIComponent(url)}`);
          const data = await res.json();
          counts[mode.title] = data.players?.filter((p: any) => p.world === mode.world).length ?? 0;
        } catch (error) {
          console.error("Chyba při načítání Dynmapy:", error);
          counts[mode.title] = 0;
        }
      }
      setPlayerCounts(counts);
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 15000); // aktualizace každých 15 sekund
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mody" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Herní Módy</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Nekonečná Zábava</span>
          </h2>
          
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Vyberte si ze 6 unikátních herních módů, každý s vlastními funkcemi a komunitou
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {gameModes.map((mode, index) => {
            const IconComponent = mode.icon;
            return (
              <div
                key={mode.title}
                className={`group card-glass relative overflow-hidden ${mode.featured ? 'lg:scale-105' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in-scale 0.6s ease-out both'
                }}
              >
                {mode.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="glass px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="gradient-text">Populární</span>
                    </div>
                  </div>
                )}

                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.color} p-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 mx-auto`}></div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {mode.description}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-2 bottom-0 absolute left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-foreground/60">
                      {playerCounts[mode.title] ?? 0} online
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[var(--radius-lg)] pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameModesSection;
