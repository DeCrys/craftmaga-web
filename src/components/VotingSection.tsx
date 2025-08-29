"use client";

import { useEffect, useMemo, useState } from "react";
import { Vote, Gift, Star, ExternalLink, Trophy, LucideIcon } from "lucide-react";

const InfoIcon: Record<string, LucideIcon> = {
  votes: Vote,
  position: Trophy,
  lastVoter: Star,
};

type SiteType = "czech-craft" | "craftlist" | "minecraftlist" | "serverlist";

type VotingSite = {
  id: string;
  name: string;
  url: string;
  reward: string;
  position?: number | null;
  votes?: number | null;
  icon: string;
  type: SiteType;
  slug?: string;
  lastVoter?: string | null;
  lastVoterSkin?: string | null;
};

const numberFmt = new Intl.NumberFormat("cs-CZ");

const VotingSection = () => {
  const initialSites: VotingSite[] = useMemo(
    () => [
      {
        id: "czech-craft",
        name: "Czech-Craft",
        url: "https://czech-craft.eu/server/crafmaga",
        reward: "100 coinů + Klíč",
        icon: "https://czech-craft.eu/static/icons/favicon.png",
        type: "czech-craft",
        slug: "crafmaga",
      },
      {
        id: "craftlist",
        name: "Craftlist",
        url: "https://craftlist.org/craftmaga#vote",
        reward: "Bonus za hlas",
        icon: "https://craftlist.org/favicon.ico",
        type: "craftlist",
        slug: "crafmaga",
      },
      {
        id: "minecraftlist",
        name: "MinecraftServery",
        url: "https://minecraftservery.eu/server/crafmaga/vote",
        reward: "75 coinů + XP Boost",
        icon: "https://minecraftservery.eu/favicon.ico",
        type: "minecraftlist",
        slug: "crafmaga",
      },
      {
        id: "minecraft-list",
        name: "Minecraft-list",
        url: "https://www.minecraft-list.cz/server/crafmaga",
        reward: "50 coinů + Bonus",
        icon: "https://www.minecraft-list.cz/assets/images/logo.svg?id=52de4764faffcb65049f",
        type: "serverlist",
        slug: "crafmaga",
      },
    ],
    []
  );

  const [votingSites, setVotingSites] = useState<VotingSite[]>(initialSites);
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setVotingSites((prev) =>
      prev.map((site) => {
        const storedVoter = localStorage.getItem(`lastVoter-${site.id}`);
        const storedSkin = localStorage.getItem(`lastVoterSkin-${site.id}`);
        return { ...site, lastVoter: storedVoter || null, lastVoterSkin: storedSkin || null };
      })
    );
  }, []);

  async function loadSiteLiveData(site: VotingSite) {
    try {
      setLoadingIds((s) => ({ ...s, [site.id]: true }));

      let data: any = null;

      if (site.slug) {
        const res = await fetch(`https://crafmaga-web-production.up.railway.app/api/${site.type}/${site.slug}`);
        data = await res.json();
      }

      if (data?.lastVoter) {
        const skin = `https://minotar.net/helm/${data.lastVoter}/32`;
        localStorage.setItem(`lastVoter-${site.id}`, data.lastVoter);
        localStorage.setItem(`lastVoterSkin-${site.id}`, skin);
        site.lastVoter = data.lastVoter;
        site.lastVoterSkin = skin;
      }

      setVotingSites((prev) =>
        prev.map((s) =>
          s.id === site.id
            ? {
                ...s,
                position: typeof data?.position === "number" ? data.position : s.position ?? null,
                votes: typeof data?.votes === "number" ? data.votes : s.votes ?? null,
                lastVoter: site.lastVoter || s.lastVoter,
                lastVoterSkin: site.lastVoterSkin || s.lastVoterSkin,
              }
            : s
        )
      );
    } catch (err) {
      console.error(`Chyba při načítání dat pro ${site.name}:`, err);
    } finally {
      setLoadingIds((s) => ({ ...s, [site.id]: false }));
    }
  }

  useEffect(() => {
    initialSites.forEach((site) => {
      loadSiteLiveData(site);
    });
  }, [initialSites]);

  const rewards = [
    { icon: Gift, title: "Denní Odměny", description: "Hlasuj každý den a získej bonus odměny", color: "from-purple-500 to-pink-500" },
    { icon: Star, title: "VIP Přístup", description: "Speciální funkce pro aktivní voliče", color: "from-yellow-500 to-orange-500" },
    { icon: Trophy, title: "Měsíční Soutěž", description: "Nejaktivnější voliči vyhrávají ceny", color: "from-green-500 to-emerald-500" },
  ];

  const openVotingLink = (site: VotingSite) => {
    window.open(site.url, "_blank", "noopener,noreferrer");
    loadSiteLiveData(site);
  };

  return (
    <section id="hlasovani" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Vote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Hlasování</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Podpoř Server</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Hlasuj pro náš server a získej úžasné odměny. Tvoje podpora nám pomáhá růst!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {rewards.map((reward, index) => {
            const IconComponent = reward.icon;
            return (
              <div
                key={reward.title}
                className="card-glass text-center group"
                style={{ animationDelay: `${index * 0.1}s`, animation: "fade-in-scale 0.6s ease-out both" }}
              >
                <div className="relative mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} p-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 mx-auto`}></div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{reward.title}</h3>
                <p className="text-sm text-foreground/70">{reward.description}</p>
              </div>
            );
          })}
        </div>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Hlasovací weby</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {votingSites.map((site, index) => {
              const isLoading = !!loadingIds[site.id];
              const supported = ["czech-craft", "craftlist", "minecraftlist", "serverlist"].includes(site.type);
              return (
                <div
                  key={site.id}
                  className="card-glass group relative overflow-hidden cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  onClick={() => openVotingLink(site)}
                  style={{ animationDelay: `${index * 0.1}s`, animation: "slide-in-up 0.6s ease-out both" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <img src={site.icon} alt={site.name} className="w-12 h-12 rounded-lg shadow-md" />
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors gradient-secondary">{site.name}</h4>
                        <p className="text-sm gradient-text font-semibold">{site.reward}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <ExternalLink className="w-5 h-5 text-foreground/50 group-hover:text-primary-light transition-colors duration-200" />
                      {site.position && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${site.position && site.position <= 3 ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" : "glass-secondary"}`}>
                          Pozice #{site.position}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-700/50 pt-4 mt-4 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
                      <div className="flex items-center gap-2">
                        <InfoIcon.votes className="w-4 h-4 text-primary-light" />
                        <span>Hlasy:</span>
                      </div>
                      <span className="font-semibold text-white">
                        {typeof site.votes === "number"
                          ? numberFmt.format(site.votes)
                          : isLoading
                          ? "Načítám…"
                          : supported
                          ? "—"
                          : "N/A"}
                      </span>
                    </div>
                    {site.lastVoter && (
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <InfoIcon.lastVoter className="w-4 h-4 text-yellow-400" />
                          <span>Poslední hlasující:</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={site.lastVoterSkin!} alt={site.lastVoter} className="w-6 h-6 rounded-full border border-gray-600 shadow-sm" />
                          <span className="font-semibold text-white">{site.lastVoter}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[var(--radius-lg)] pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
