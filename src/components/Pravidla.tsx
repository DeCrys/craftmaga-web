import React from "react";
import Navigation from "@/components/Navigation";
import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

const PravidlaServeru = () => {
  const pravidla = [
    { title: "1. Respektujte ostatní hráče", description: "Neurážejte, neobtěžujte a nevytvářejte konflikty s ostatními hráči." },
    { title: "2. Cheaty a hacky jsou zakázány", description: "Používání cheatů, modifikací nebo exploitů, které dávají výhodu, je přísně zakázáno." },
    { title: "3. Reklama je zakázána", description: "Neposkytujte reklamu na jiné servery, weby nebo produkty." },
    { title: "4. Nevhodný obsah", description: "Nepoužívejte nevhodný jazyk, rasismus, sexismus nebo jiné urážlivé chování." },
    { title: "5. Správa serveru", description: "Respektujte rozhodnutí administrátorů a moderátorů serveru." },
  ];

  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Pravidla serveru", href: "/pravidla" },
    { label: "Nápověda", href: "/napoveda" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Discord", href: "https://discord.gg/eTuYxy7Ry9", external: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <section id="pravidla" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                  Pravidla serveru
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dodržování pravidel je klíčové pro příjemné hraní na našem serveru.
              </p>
            </div>

            <div className="space-y-8">
              {pravidla.map((item, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 relative overflow-hidden border-t border-glass-border">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <img
                src={logoImage}
                alt="logo"
                width={50}
                height={50}
              />
              <span className="text-2xl font-bold gradient-text">CraftMaga</span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Nejlepší český Minecraft server s unikátními herními módy a skvělou komunitou.
              Připoj se k nám a začni své dobrodružství!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-bold mb-4 text-primary">Rychlé odkazy</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <div key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Server Info */}
          <div className="text-center md:text-right">
            <h3 className="font-bold mb-4 text-primary">Server info</h3>
            <div className="space-y-2 text-sm">
              <div className="glass inline-block px-3 py-1 rounded-full">
                <span className="text-foreground/70">IP: </span>
                <span className="font-semibold">play.craftmaga.cz</span>
              </div>
              <div>
                <span className="text-foreground/70">Verze: </span>
                <span className="font-semibold text-primary">1.19-1.21</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <span>© {currentYear} CraftMaga</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Web s láskou</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>vytvořil DeCrys</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default PravidlaServeru;
