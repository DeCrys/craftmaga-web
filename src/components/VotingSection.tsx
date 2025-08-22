"use client";

import { useEffect, useMemo, useState } from "react";
import { Vote, Gift, Star, ExternalLink, Trophy } from "lucide-react";

type SiteType =
  | "czech-craft"
  | "craftlist"
  | "minecraftlist"
  | "serverlist"
  | "topcraft-cz";

type VotingSite = {
  id: string;
  name: string;
  url: string;
  reward: string;
  position?: number | null;
  votes?: number | null;
  icon: string; // URL na favicon
  type: SiteType;
  slug?: string; // Czech-Craft: server slug
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
        position: undefined,
        votes: undefined,
        icon: "https://czech-craft.eu/static/icons/favicon.png",
        type: "czech-craft",
        slug: "crafmaga",
      },
      {
        id: "craftlist",
        name: "Craftlist",
        url: "https://craftlist.org/craftmaga#vote",
        reward: "Bonus za hlas",
        position: undefined,
        votes: undefined,
        icon: "https://craftlist.org/favicon.ico",
        type: "craftlist",
      },
      {
        id: "minecraftlist",
        name: "MinecraftServery.eu",
        url: "https://minecraftservery.eu/server/craftmaga/vote",
        reward: "75 coinů + XP Boost",
        position: undefined,
        votes: undefined,
        icon: "https://minecraftservery.eu/favicon.ico",
        type: "minecraftlist",
      },
      {
        id: "minebook",
        name: "Minebook",
        url: "https://minebook.eu/server/221",
        reward: "50 coinů + Bonus",
        position: undefined,
        votes: undefined,
        icon: "https://minebook.eu/images/icons/favicon.ico",
        type: "serverlist",
      },
    ],
    []
  );

  const [votingSites, setVotingSites] = useState<VotingSite[]>(initialSites);
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  async function loadSiteLiveData(site: VotingSite) {
    try {
      setLoadingIds((s) => ({ ...s, [site.id]: true }));
      const p = new URLSearchParams({ site: site.type });
      if (site.type === "czech-craft" && site.slug) p.set("slug", site.slug);

      const res = await fetch(`/api/votes?${p.toString()}`, { cache: "no-store" });
      const data = await res.json();

      setVotingSites((prev) =>
        prev.map((s) =>
          s.id === site.id
            ? {
                ...s,
                position:
                  typeof data?.position === "number"
                    ? data.position
                    : s.position ?? null,
                votes:
                  typeof data?.votes === "number"
                    ? data.votes
                    : s.votes ?? null,
              }
            : s
        )
      );
    } catch {
      // necháme ticho
    } finally {
      setLoadingIds((s) => ({ ...s, [site.id]: false }));
    }
  }

  useEffect(() => {
    initialSites.forEach((site) => {
      if (site.type === "czech-craft" || site.type === "craftlist") {
        loadSiteLiveData(site);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rewards = [
    {
      icon: Gift,
      title: "Denní Odměny",
      description: "Hlasuj každý den a získej bonus odměny",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      title: "VIP Přístup",
      description: "Speciální funkce pro aktivní voliče",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Trophy,
      title: "Měsíční Soutěž",
      description: "Nejaktivnější voliči vyhrávají ceny",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const openVotingLink = (site: VotingSite) => {
    window.open(site.url, "_blank", "noopener,noreferrer");
    if (site.type === "czech-craft" || site.type === "craftlist") {
      loadSiteLiveData(site);
    }
  };

  return (
    <section id="hlasovani" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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

        {/* Voting Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {rewards.map((reward, index) => {
            const IconComponent = reward.icon;
            return (
              <div
                key={reward.title}
                className="card-glass text-center group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fade-in-scale 0.6s ease-out both",
                }}
              >
                <div className="relative mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} p-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 mx-auto`}
                  ></div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {reward.title}
                </h3>
                <p className="text-sm text-foreground/70">{reward.description}</p>
              </div>
            );
          })}
        </div>

        {/* Voting Sites */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">
            Hlasovací weby
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {votingSites.map((site, index) => {
              const isLoading = !!loadingIds[site.id];
              const supported =
                site.type === "czech-craft" || site.type === "craftlist";
              return (
                <div
                  key={site.id}
                  className="card-glass group relative overflow-hidden cursor-pointer"
                  onClick={() => openVotingLink(site)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "slide-in-up 0.6s ease-out both",
                  }}
                >
                  {/* Position Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        site.position && site.position <= 3
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                          : "glass"
                      }`}
                    >
                      {site.position ? `#${site.position}` : "—"}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Site Icon */}
                    <img
                      src={site.icon}
                      alt={site.name}
                      className="w-10 h-10 rounded-md"
                    />

                    {/* Site Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold group-hover:text-primary transition-colors">
                          {site.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-foreground/40" />
                      </div>

                      <p className="text-sm text-primary font-semibold mb-1">
                        {site.reward}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-foreground/60">
                        <span>
                          {typeof site.votes === "number"
                            ? `${numberFmt.format(site.votes)} hlasů`
                            : isLoading
                            ? "Načítám…"
                            : supported
                            ? "—"
                            : "N/A"}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Aktivní</span>
                        </div>
                        {!supported && (
                          <span className="ml-auto text-[11px] opacity-60">
                            live data nedostupná
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
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
